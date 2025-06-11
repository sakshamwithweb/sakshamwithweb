import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { validateJWT } from "./lib/generateToken";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const allRateLimits = {
  "/api/fetchAdminDetails": { requestsPerDuration: 50, durationInMinute: 1 },
  "/api/sendQuestion": { requestsPerDuration: 1, durationInMinute: 5 },
  "default": { requestsPerDuration: 20, durationInMinute: 1 },
};

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/api')) { // for apis

    const currentRateLimit = allRateLimits[pathname] || allRateLimits['default']
    const ratelimit = new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(currentRateLimit.requestsPerDuration, `${currentRateLimit.durationInMinute * 60} s`),
    });
    const ip = req.ip || req.headers.get("x-forwarded-for") || "unknown";
    const rateLimitKey = `${pathname}-${ip}`
    const { success, limit, remaining, reset } = await ratelimit.limit(rateLimitKey);
    if (!success) {
      const response = new NextResponse(`Too many requests`, { status: 429 });
      response.headers.set("X-RateLimit-Limit", limit);
      response.headers.set("X-RateLimit-Remaining", remaining);
      response.headers.set("X-RateLimit-Reset", reset);
      return response
    }
    // Now here write condition for jwt
    const { id } = await req.json()
    const token = req.headers.get('authorization')?.split(' ')[1]
    if (!token || !id) return NextResponse.json({ success: false, message: "Didn't get Token" }, { status: 403 })
    const validateToken = await validateJWT(token, id)
    if (!validateToken.valid) return NextResponse.json({ success: false, message: "Invalid token!" }, { status: 403 })
    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", limit);
    response.headers.set("X-RateLimit-Remaining", remaining);
    response.headers.set("X-RateLimit-Reset", reset);
    return response
  }
}

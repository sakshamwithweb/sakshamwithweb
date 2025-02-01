import About from "@/components/About";
import Knowledge from "@/components/Knowledge";
import MainBanner from "@/components/MainBanner";
import Project from "@/components/Project";

export default function Home() {
  return (
    <main className="">
      <div><MainBanner /></div>
      <div><About /></div>
      <div><Knowledge/></div>
      <div><Project/></div>
      <div></div>
    </main>
  );
}

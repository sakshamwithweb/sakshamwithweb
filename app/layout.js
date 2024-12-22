import Navbar from "@/components/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "Saksham Goswami",
  description: "Saksham's Identity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-p-20 scroll-smooth">
      <body>
        <ThemeProvider attribute="class"
          defaultTheme="system"
          enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

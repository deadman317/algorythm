import { Footer, Navbar } from "@/components";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AlgoRythm",
  description: "A Algorithm Visualizer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={
          (inter.className,
          "flex h-screen min-h-screen flex-col justify-between px-2")
        }
      >
        <Navbar />
        <main className="overflow-y-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

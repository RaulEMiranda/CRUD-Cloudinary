import type { Metadata } from "next";
import "./globals.css";

import { Footer } from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="bg-white text-[#333333]">
        <header>
          <Navbar />
        </header>
        <main className="container mx-auto py-8 px-5 mt-20">{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
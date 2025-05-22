import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "MystryMessage",
  description: "Created by @sajjadalidev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

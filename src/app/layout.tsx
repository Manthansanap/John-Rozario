import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import RootWrapper from "@/components/layout/RootWrapper";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adv. Rozario John | Premium Legal Services",
  description: "High-end legal solutions by Adv. Rozario John. Specializing in Criminal, Civil, and Property law.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col bg-rich-black text-white`}>
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}

"use client";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <SessionProvider>
      {!isAdmin && <Navbar />}
      <main className={!isAdmin ? "flex-grow pt-24" : "flex-grow"}>{children}</main>
      {!isAdmin && <Footer />}
    </SessionProvider>
  );
}

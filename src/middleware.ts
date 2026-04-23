import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register";
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
  const isNotesPage = req.nextUrl.pathname.startsWith("/notes");

  if (isAuthPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }
    return null;
  }

  if (isNotesPage || isAdminPage) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // Role-based protection for admin
    if (isAdminPage && (req.auth?.user as any)?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  return null;
});

export const config = {
  matcher: ["/admin/:path*", "/notes/:path*", "/login", "/register"],
};

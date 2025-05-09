import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log(`Middleware for path: ${req.nextUrl.pathname}`);

  // Cache-control
  if (!token && req.nextUrl.pathname === "/")
    NextResponse.next().headers.set("Cache-Control", "public, max-age=60");

  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isUserPage = req.nextUrl.pathname.startsWith("/user");

  if (isUserPage && !token)
    return NextResponse.redirect(new URL("/", req.nextUrl));

  if (isAuthPage && token)
    return NextResponse.redirect(new URL("/", req.nextUrl));

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/auth/:path*"],
};

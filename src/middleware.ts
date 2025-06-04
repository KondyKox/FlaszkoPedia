import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  console.log(`Middleware for path: ${pathname}`);

  // Cache-control
  if (!token && pathname === "/")
    NextResponse.next().headers.set("Cache-Control", "public, max-age=60");

  const isAuthPage = pathname.startsWith("/auth");
  const isUserPage = pathname.startsWith("/user");
  const isAdminPage = pathname.startsWith("/admin");

  if ((isUserPage || isAdminPage) && !token)
    return NextResponse.redirect(new URL("/", req.nextUrl));

  if (isAuthPage && token)
    return NextResponse.redirect(new URL("/", req.nextUrl));

  if (isAdminPage && token?.role !== "admin")
    return NextResponse.redirect(new URL("/", req.nextUrl));

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/auth/:path*", "/admin/:path"],
};

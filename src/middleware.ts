import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "admin_session";

export function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const valid = Boolean(session) && session === process.env.ADMIN_SESSION_TOKEN;

  if (!valid && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  if (valid && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

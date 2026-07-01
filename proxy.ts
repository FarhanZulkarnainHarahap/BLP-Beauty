import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const developmentCookie = "authjs.session-token";
const productionCookie = "__Secure-authjs.session-token";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const sessionToken =
    request.cookies.get(productionCookie) ?? request.cookies.get(developmentCookie);

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // The protected server layout validates the database session and role.
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

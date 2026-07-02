import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { AuthSession, Role } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

const publicCustomerPaths = ["/", "/shop", "/campaign", "/journal", "/our-story"];
const protectedCustomerPaths = ["/profile", "/notifications"];

const matchesPath = (pathname: string, path: string) =>
  pathname === path || (path !== "/" && pathname.startsWith(`${path}/`));

const dashboardPathForRole = (role: Role) => {
  if (role === "ADMIN") return "/dashboard/admin";
  if (role === "SUPER_ADMIN") return "/dashboard/super_admin";
  return "/";
};

function loginRedirect(request: NextRequest) {
  const login = new URL("/login", request.url);
  login.searchParams.set("callbackUrl", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(login);
}

function routeRole(pathname: string): Role | null {
  if (matchesPath(pathname, "/dashboard/admin")) return "ADMIN";
  if (matchesPath(pathname, "/dashboard/super_admin")) return "SUPER_ADMIN";
  if (
    publicCustomerPaths.some((path) => matchesPath(pathname, path)) ||
    protectedCustomerPaths.some((path) => matchesPath(pathname, path)) ||
    matchesPath(pathname, "/dashboard/customer")
  ) {
    return "USER";
  }
  return null;
}

// Next.js 16 renamed middleware.ts to proxy.ts. This is the route middleware.
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard/cutomer")) {
    const suffix = request.nextUrl.pathname.replace("/dashboard/cutomer", "");
    const corrected = request.nextUrl.clone();
    corrected.pathname = suffix || "/";
    return NextResponse.redirect(corrected);
  }

  const requiredRole = routeRole(request.nextUrl.pathname);
  if (!requiredRole) return NextResponse.next();

  const customerGuestRoute =
    requiredRole === "USER" &&
    !protectedCustomerPaths.some((path) => matchesPath(request.nextUrl.pathname, path));
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader || !API_URL) {
    return customerGuestRoute ? NextResponse.next() : loginRedirect(request);
  }

  try {
    const response = await fetch(`${API_URL}/api/auth/session`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });
    if (!response.ok) {
      return customerGuestRoute ? NextResponse.next() : loginRedirect(request);
    }

    const session = (await response.json()) as AuthSession | null;
    if (!session?.user?.id) {
      return customerGuestRoute ? NextResponse.next() : loginRedirect(request);
    }

    if (session.user.role !== requiredRole) {
      return NextResponse.redirect(new URL(dashboardPathForRole(session.user.role), request.url));
    }

    return NextResponse.next();
  } catch {
    return customerGuestRoute ? NextResponse.next() : loginRedirect(request);
  }
}

export const config = {
  matcher: [
    "/",
    "/shop/:path*",
    "/campaign",
    "/journal/:path*",
    "/our-story",
    "/profile",
    "/notifications",
    "/dashboard/admin/:path*",
    "/dashboard/customer/:path*",
    "/dashboard/super_admin/:path*",
    "/dashboard/cutomer/:path*",
  ],
};

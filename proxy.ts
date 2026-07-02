import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { AuthSession, Role } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

const dashboardRoles: Array<{ path: string; role: Role }> = [
  { path: "/dashboard/admin", role: "ADMIN" },
  { path: "/dashboard/customer", role: "USER" },
  { path: "/dashboard/super_admin", role: "SUPER_ADMIN" },
];

const protectedCustomerPaths = ["/dashboard/customer/profile", "/dashboard/customer/notifications"];

const dashboardPathForRole = (role: Role) => {
  if (role === "ADMIN") return "/dashboard/admin";
  if (role === "SUPER_ADMIN") return "/dashboard/super_admin";
  return "/dashboard/customer";
};

function loginRedirect(request: NextRequest) {
  const login = new URL("/login", request.url);
  login.searchParams.set("callbackUrl", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(login);
}

// Next.js 16 renamed middleware.ts to proxy.ts. This is the route middleware.
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard/cutomer")) {
    const corrected = request.nextUrl.clone();
    corrected.pathname = request.nextUrl.pathname.replace(
      "/dashboard/cutomer",
      "/dashboard/customer",
    );
    return NextResponse.redirect(corrected);
  }

  const rule = dashboardRoles.find(({ path }) => request.nextUrl.pathname.startsWith(path));
  if (!rule) return NextResponse.next();

  const customerGuestRoute =
    rule.role === "USER" &&
    !protectedCustomerPaths.some((path) => request.nextUrl.pathname.startsWith(path));
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

    if (session.user.role !== rule.role) {
      return NextResponse.redirect(new URL(dashboardPathForRole(session.user.role), request.url));
    }

    return NextResponse.next();
  } catch {
    return customerGuestRoute ? NextResponse.next() : loginRedirect(request);
  }
}

export const config = {
  matcher: [
    "/dashboard/admin/:path*",
    "/dashboard/customer/:path*",
    "/dashboard/super_admin/:path*",
    "/dashboard/cutomer/:path*",
  ],
};

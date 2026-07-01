import { auth } from "@/auth";
import { API_URL } from "@/lib/api";
import { createInternalToken } from "@/lib/internal-token";
import { NextRequest, NextResponse } from "next/server";

async function forward(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json(
      { success: false, error: { message: "Authentication required" } },
      { status: 401 },
    );
  if (!["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
    return NextResponse.json(
      { success: false, error: { message: "Admin access required" } },
      { status: 403 },
    );
  const { path } = await params;
  if (path[0] === "users" && session.user.role !== "SUPER_ADMIN")
    return NextResponse.json(
      { success: false, error: { message: "Super admin access required" } },
      { status: 403 },
    );
  const token = await createInternalToken(session.user);
  const target = `${API_URL}/${path.map(encodeURIComponent).join("/")}${request.nextUrl.search}`;
  const contentType = request.headers.get("content-type") ?? "";
  const body = ["GET", "HEAD"].includes(request.method)
    ? undefined
    : contentType.includes("multipart/form-data")
      ? await request.formData()
      : await request.text();
  const response = await fetch(target, {
    method: request.method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    },
    body,
  });
  return new NextResponse(response.body, {
    status: response.status,
    headers: { "Content-Type": response.headers.get("content-type") ?? "application/json" },
  });
}
export const GET = forward;
export const POST = forward;
export const PATCH = forward;
export const DELETE = forward;

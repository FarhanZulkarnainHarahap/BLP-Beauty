import { SignJWT } from "jose";
import type { Session } from "next-auth";
export async function createInternalToken(user: Session["user"]) {
  const secret = process.env.INTERNAL_API_SECRET;
  if (!secret) throw new Error("INTERNAL_API_SECRET is not configured");
  return new SignJWT({ email: user.email, role: user.role, type: "internal-api" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuer("beauty-web")
    .setAudience("beauty-api")
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(new TextEncoder().encode(secret));
}

import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import type { OAuthConfig } from "next-auth/providers";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

type TikTokProfile = {
  data: { user: { open_id: string; union_id?: string; display_name: string; avatar_url?: string } };
};
type TikTokTokenContext = {
  params: { code?: string };
  provider: { clientId?: string; clientSecret?: string; callbackUrl: string };
};
const TikTok: OAuthConfig<TikTokProfile> = {
  id: "tiktok",
  name: "TikTok",
  type: "oauth",
  clientId: process.env.AUTH_TIKTOK_ID,
  clientSecret: process.env.AUTH_TIKTOK_SECRET,
  authorization: {
    url: "https://www.tiktok.com/v2/auth/authorize/",
    params: {
      client_key: process.env.AUTH_TIKTOK_ID,
      scope: "user.info.basic",
      response_type: "code",
    },
  },
  token: {
    url: "https://open.tiktokapis.com/v2/oauth/token/",
    async request({ params, provider }: TikTokTokenContext) {
      const response = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_key: provider.clientId!,
          client_secret: provider.clientSecret!,
          code: params.code!,
          grant_type: "authorization_code",
          redirect_uri: provider.callbackUrl,
        }),
      });
      return { tokens: await response.json() };
    },
  },
  userinfo:
    "https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name",
  profile(profile) {
    const user = profile.data.user;
    return { id: user.open_id, name: user.display_name, email: null, image: user.avatar_url };
  },
  checks: ["pkce", "state"],
};
export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    Facebook({ allowDangerousEmailAccountLinking: true }),
    TikTok,
  ],
  pages: { signIn: "/login" },
  session: { strategy: "database" },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = (user as typeof user & { role: "USER" | "ADMIN" | "SUPER_ADMIN" }).role;
      }
      return session;
    },
  },
  trustHost: true,
} satisfies NextAuthConfig;
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

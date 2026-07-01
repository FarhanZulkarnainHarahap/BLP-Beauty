import "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "USER" | "ADMIN" | "SUPER_ADMIN";
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  interface User {
    role?: "USER" | "ADMIN" | "SUPER_ADMIN";
  }
}

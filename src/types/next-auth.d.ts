import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      email: string;
      role: "admin" | "user";
      favorites?: string[];
    };
  }

  interface User {
    _id: string;
    email: string;
    role: "admin" | "user";
    favorites?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    email: string;
    role: "admin" | "user";
    favorites?: string[];
  }
}

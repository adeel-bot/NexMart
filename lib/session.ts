// lib/session.ts
import { withIronSession } from "next-iron-session";

export function withSession(handler: any) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD || "complex_password_at_least_32_characters_long",
    cookieName: "next-session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
}

export type SessionUser = {
  id: number;
  email: string;
  name: string;
  role: string;
};
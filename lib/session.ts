// lib/session.ts
import { getIronSession, IronSession, SessionOptions } from 'iron-session';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const sessionOptions: SessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD || "complex_password_at_least_32_characters_long",
    cookieName: 'next-session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
};

export async function getSession(cookieStore: ReadonlyRequestCookies): Promise<IronSession<SessionUser>> {
    return getIronSession<SessionUser>(cookieStore, sessionOptions);
}

export type SessionUser = {
    id: number;
    email: string;
    name: string;
    role: string;
    isLoggedIn: boolean;
};
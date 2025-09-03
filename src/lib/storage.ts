import type { AppUser } from "@/types/user";

const USER_KEY = "auth:user";

const isBrowser = () => typeof window !== "undefined";

export const getUser = (): AppUser | null => {
    if (!isBrowser()) return null;
    try {
        const raw = window.localStorage.getItem(USER_KEY);
        return raw ? (JSON.parse(raw) as AppUser) : null;
    } catch {
        return null;
    }
};

export const setUser = (u: AppUser) => {
    if (!isBrowser()) return;
    window.localStorage.setItem(USER_KEY, JSON.stringify(u));
};

export const clearUser = () => {
    if (!isBrowser()) return;
    window.localStorage.removeItem(USER_KEY);
};

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { AppUser } from "@/types/user";
import { clearUser, getUser } from "@/lib/storage";
import { LoadingButton } from "@/components/button";

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<AppUser | null>(null);
    const [leaving, setLeaving] = useState(false);

    useEffect(() => {
        const u = getUser();
        if (!u) {
            router.replace("/login");
            return;
        }
        setUser(u);
    }, [router]);

    const handleLogout = () => {
        setLeaving(true);
        clearUser();
        router.replace("/login");
    };

    if (!user) return null;

    return (
        <main className="main-wrap">
            <section className="card text-center" role="region" aria-labelledby="dash-title">
                <h1 id="dash-title" className="text-xl font-semibold">خوش آمدی {user.name.first} {user.name.last} 👋</h1>
                <div className="mt-4">
                    <img
                        src={user.picture.medium}
                        alt={`${user.name.first} ${user.name.last}`}
                        width={96}
                        height={96}
                        className="mx-auto rounded-full border border-gray-200"
                    />
                    <p className="mt-2 text-sm text-gray-600">{user.email}</p>
                    <p className="mt-1 text-xs text-gray-500">{user.phone}</p>
                </div>
                <LoadingButton className="mt-6 w-full" variant="destructive" onClick={handleLogout} loading={leaving}>
                    خروج
                </LoadingButton>
            </section>
        </main>
    );
}

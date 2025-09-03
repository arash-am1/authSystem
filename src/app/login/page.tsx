"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isValidIranPhone, normalizePhone } from "@/lib/validation";
import { setUser, getUser } from "@/lib/storage";
import { LoadingButton } from "@/components/button";
import { FormInput } from "@/components/form-input";

export default function LoginPage() {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // If already logged in, go dashboard
    useEffect(() => {
        if (getUser()) router.replace("/dashboard");
    }, [router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = phone.trim();

        if (!isValidIranPhone(value)) {
            setError("لطفاً شماره موبایل معتبر ایران وارد کنید (09xxxxxxxxx یا +989xxxxxxxxx یا 00989xxxxxxxxx)");
            return;
        }

        setError(null);
        setLoading(true);
        try {
            const res = await fetch("https://randomuser.me/api/?results=1&nat=us", { cache: "no-store" });
            if (!res.ok) throw new Error("API error");
            const json = await res.json();
            const u = json?.results?.[0];
            if (!u) throw new Error("No user returned");

            // Store minimal user shape we actually need
            setUser({
                name: { first: u.name.first, last: u.name.last, title: u.name.title },
                email: u.email,
                picture: { large: u.picture.large, medium: u.picture.medium, thumbnail: u.picture.thumbnail },
                phone: normalizePhone(value),
            });

            router.replace("/dashboard");
        } catch (err) {
            setError("مشکلی در ورود پیش آمد. دوباره تلاش کنید.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="main-wrap">
            <section className="card" role="region" aria-labelledby="login-title">
                <h1 id="login-title" className="text-xl font-semibold mb-4 text-center">ورود</h1>
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    <FormInput
                        id="phone"
                        type="tel"
                        label="شماره موبایل"
                        placeholder="09xxxxxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        inputMode="tel"
                        dir="ltr"
                        pattern="^(?:09\\d{9}|\\+989\\d{9}|00989\\d{9})$"
                        ariaDescribedBy={error ? "phone-error" : undefined}
                        ariaInvalid={!!error}
                    />

                    {error && (
                        <p id="phone-error" aria-live="polite" className="text-sm text-red-600">{error}</p>
                    )}

                    <LoadingButton type="submit" className="w-full" loading={loading} aria-busy={loading}>
                        {loading ? "در حال ورود…" : "ورود"}
                    </LoadingButton>
                </form>

                <p className="mt-4 text-xs text-gray-500 text-center">
                    با ورود، یک کاربر آزمایشی از <span className="font-medium">randomuser.me</span> دریافت می‌شود.
                </p>
            </section>
        </main>
    );
}

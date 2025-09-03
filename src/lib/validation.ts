export const IRAN_PHONE_REGEX = /^(?:09\d{9}|\+989\d{9}|00989\d{9})$/;

export const isValidIranPhone = (phone: string): boolean => IRAN_PHONE_REGEX.test(phone.trim());

/** Normalize to +989xxxxxxxxx for consistency */
export const normalizePhone = (phone: string): string => {
    const p = phone.replace(/\s|-/g, "");
    if (p.startsWith("+989")) return p;
    if (p.startsWith("00989")) return "+" + p.slice(2); // 00989 → +989
    if (p.startsWith("09")) return "+98" + p.slice(1);   // 09xxxxxxxxx → +989xxxxxxxxx
    return p;
};

'use client';

import { useLanguage } from "@/hooks/useLanguage";

const FLAGS: Record<string, string> = {
    en: "EN",
    de: "DE"
}

export default function LanguageSwitcher() {
    const { locale, setLanguage, availableLocales } = useLanguage();

    return (
        <div className="flex gap-2">
            { availableLocales.map((lang) => (
                <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`p-1 rounded ${locale === lang ? 'bg-blue-500 text-white' : 'bg-slate-600'}`}
                >
                    {FLAGS[lang]}
                </button>
            )) }
        </div>
    )
}
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { getLocalizedUrl } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

export function useLanguage() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const setLanguage = (lang: string) => {
        const newUrl = getLocalizedUrl(pathname, lang);
        router.push(newUrl);
    }

    return { locale, setLanguage, availableLocales: routing.locales }
}
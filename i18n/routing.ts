import {defineRouting} from 'next-intl/routing';

const supportedLocales = ['en', 'de'] as const;
type Locale = typeof supportedLocales[number];

export const routing = defineRouting({
  locales: supportedLocales,
  defaultLocale: 'en'
});

export function getLocalizedUrl(pathname: string, locale: string): string {
  if (!supportedLocales.includes(locale as Locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  const segments = pathname.split('/');
  const currentLocale = supportedLocales.includes(segments[1] as Locale) ? segments[1] : null;

  if (currentLocale) {
    segments[1] = locale;
  } else {
    segments.splice(1, 0, locale);
  }

  return segments.join('/') || '/';
}
import Link from "next/link";
import { type Locale, getTranslations, locales } from "@/lib/i18n";

interface HeaderProps {
  lang: Locale;
}

export function Header({ lang }: HeaderProps) {
  const t = getTranslations(lang);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="text-xl font-bold tracking-tight text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
        >
          David Medina
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6" aria-label="Main navigation">
          <Link
            href={`/${lang}`}
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            {t.home}
          </Link>
          <Link
            href={`/${lang}/blog`}
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            {t.blog}
          </Link>
          <Link
            href={`/${lang}/about`}
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            {t.about}
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 border-l border-zinc-200 pl-6 dark:border-zinc-700" role="group" aria-label="Language selector">
            {locales.map((locale) => (
              <Link
                key={locale}
                href={`/${locale}`}
                className={`text-xs font-bold uppercase transition-colors ${
                  locale === lang
                    ? "text-zinc-900 dark:text-zinc-50"
                    : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-400"
                }`}
                aria-label={`Switch to ${locale.toUpperCase()}`}
              >
                {locale}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

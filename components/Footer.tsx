import Link from "next/link";
import { type Locale, getTranslations } from "@/lib/i18n";

interface FooterProps {
  lang: Locale;
}

export function Footer({ lang }: FooterProps) {
  const t = getTranslations(lang);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
              David Medina
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              AI/ML Engineer • Data Architect • Community Builder
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Montreal, Canada
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
              Links
            </p>
            <ul className="space-y-2" role="list">
              <li>
                <Link
                  href={`/${lang}`}
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  {t.home}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/blog`}
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  {t.blog}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/about`}
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  {t.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/contact`}
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
              Connect
            </p>
            <ul className="space-y-2" role="list">
              <li>
                <a
                  href="https://www.linkedin.com/in/planckcode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/planckc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://mysion.co/davidmedina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  MYSION.CO
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            © {currentYear} David Medina. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

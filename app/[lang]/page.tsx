import { type Locale, getTranslations } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Locale };
  const t = getTranslations(lang);

  return (
    <div className="flex min-h-screen flex-col">
      <Header lang={lang} />

      <main className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 px-4 dark:from-zinc-900 dark:to-black">
        <div className="flex max-w-4xl flex-col items-center gap-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
            David Medina
          </h1>

          <p className="text-xl text-zinc-600 dark:text-zinc-400 sm:text-2xl">
            AI/ML Engineer • Data Architect • Community Builder
          </p>

          <div className="flex gap-4">
            <Link
              href={`/${lang}/blog`}
              className="rounded-full bg-zinc-900 px-8 py-3 font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {t.blog}
            </Link>
            <Link
              href={`/${lang}/about`}
              className="rounded-full border border-zinc-300 bg-white px-8 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
            >
              {t.about}
            </Link>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}

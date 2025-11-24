import { type Locale, getTranslations } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PostList } from "@/components/PostList";
import { posts } from "#site/content";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Locale };
  const t = getTranslations(lang);

  // Filter posts by language and published status
  const filteredPosts = posts
    .filter((post) => post.lang === lang && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex min-h-screen flex-col">
      <Header lang={lang} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              {t.blog}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Thoughts on technology, data engineering, and community building
            </p>
          </div>

          {/* Posts List */}
          <PostList posts={filteredPosts} locale={lang} />
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}

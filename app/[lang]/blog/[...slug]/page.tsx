import { notFound } from "next/navigation";
import { type Locale, getTranslations } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { posts } from "#site/content";
import { MDXContent } from "@/components/MDXContent";

interface PostPageProps {
  params: Promise<{
    lang: string;
    slug: string[];
  }>;
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const { slug } = await params;
  const slugPath = slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slugPath);

  if (!post) {
    return null;
  }

  return post;
}

export async function generateStaticParams(): Promise<
  { lang: string; slug: string[] }[]
> {
  return posts.map((post) => ({
    lang: post.lang,
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { lang } = (await params) as { lang: Locale };
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  const t = getTranslations(lang);
  const date = new Date(post.date);
  const formattedDate = date.toLocaleDateString(lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header lang={lang} />

      <main className="flex-1">
        <article className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Article Header */}
          <header className="mx-auto mb-12 max-w-3xl">
            <div className="mb-4 flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
              <time dateTime={post.date}>{formattedDate}</time>
              <span>•</span>
              <span className="capitalize">{post.category.replace("-", " ")}</span>
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              {post.title}
            </h1>

            {post.description && (
              <p className="text-xl text-zinc-600 dark:text-zinc-400">
                {post.description}
              </p>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-zinc dark:prose-invert prose-headings:scroll-mt-20 prose-headings:font-bold prose-a:text-zinc-900 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-zinc-50">
              <MDXContent code={post.body} />
            </div>
          </div>
        </article>
      </main>

      <Footer lang={lang} />
    </div>
  );
}

import Link from "next/link";
import { type Locale, getTranslations, categoryTranslations } from "@/lib/i18n";

interface Post {
  slug: string;
  slugAsParams: string;
  title: string;
  description?: string;
  date: string;
  lang: string;
  category: string;
  tags?: string[];
}

interface PostCardProps {
  post: Post;
  locale: Locale;
}

export function PostCard({ post, locale }: PostCardProps) {
  const t = getTranslations(locale);
  const date = new Date(post.date);
  const formattedDate = date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group relative flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      {/* Category Badge */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {categoryTranslations[locale]?.[post.category] || post.category}
        </span>
        <time
          dateTime={post.date}
          className="text-sm text-zinc-500 dark:text-zinc-500"
        >
          {formattedDate}
        </time>
      </div>

      {/* Title */}
      <Link href={`/${locale}/blog/${post.slugAsParams}`} className="group">
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-600 dark:text-zinc-50 dark:group-hover:text-zinc-300">
          {post.title}
        </h3>
      </Link>

      {/* Description */}
      {post.description && (
        <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
          {post.description}
        </p>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-zinc-500 dark:text-zinc-500"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Read More */}
      <Link
        href={`/${locale}/blog/${post.slugAsParams}`}
        className="mt-2 inline-flex items-center text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
      >
        {t.readMore}
        <svg
          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </article>
  );
}

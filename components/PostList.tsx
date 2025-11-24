"use client";

import { useState } from "react";
import { PostCard } from "./PostCard";
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

interface PostListProps {
  posts: Post[];
  locale: Locale;
}

export function PostList({ posts, locale }: PostListProps) {
  const t = getTranslations(locale);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories from posts
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  // Filter posts by selected category
  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {t.filterByCategory}:
        </span>
        <button
          onClick={() => setSelectedCategory(null)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selectedCategory === null
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          }`}
        >
          {t.allPosts}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            {categoryTranslations[locale]?.[category] || category}
          </button>
        ))}
      </div>

      {/* Posts Count */}
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {filteredPosts.length}{" "}
        {filteredPosts.length === 1 ? "post" : "posts"}
        {selectedCategory && ` in ${categoryTranslations[locale]?.[selectedCategory] || selectedCategory}`}
      </p>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700">
          <p className="text-zinc-500 dark:text-zinc-500">
            No posts found in this category
          </p>
        </div>
      )}
    </div>
  );
}

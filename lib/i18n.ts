// i18n configuration for the site
// Supports English, Spanish, and French

export const locales = ['en', 'es', 'fr'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

// Language names in their native language
export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
}

// Category translations
export const categoryTranslations: Record<Locale, Record<string, string>> = {
  en: {
    technology: 'Technology',
    'data-engineering': 'Data Engineering',
    community: 'Community',
  },
  es: {
    tecnologia: 'Tecnología',
    'ingenieria-datos': 'Ingeniería de Datos',
    comunidad: 'Comunidad',
  },
  fr: {
    technologie: 'Technologie',
    'ingenierie-donnees': 'Ingénierie des Données',
    communaute: 'Communauté',
  },
}

// UI translations
export const translations = {
  en: {
    home: 'Home',
    blog: 'Blog',
    about: 'About',
    contact: 'Contact',
    readMore: 'Read more',
    allPosts: 'All posts',
    filterByCategory: 'Filter by category',
    backToHome: 'Back to home',
    publishedOn: 'Published on',
    minuteRead: 'min read',
  },
  es: {
    home: 'Inicio',
    blog: 'Blog',
    about: 'Acerca de',
    contact: 'Contacto',
    readMore: 'Leer más',
    allPosts: 'Todos los posts',
    filterByCategory: 'Filtrar por categoría',
    backToHome: 'Volver al inicio',
    publishedOn: 'Publicado el',
    minuteRead: 'min de lectura',
  },
  fr: {
    home: 'Accueil',
    blog: 'Blog',
    about: 'À propos',
    contact: 'Contact',
    readMore: 'Lire plus',
    allPosts: 'Tous les articles',
    filterByCategory: 'Filtrer par catégorie',
    backToHome: "Retour à l'accueil",
    publishedOn: 'Publié le',
    minuteRead: 'min de lecture',
  },
} as const

// Helper function to get translations for a specific locale
export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale]
}

// Helper function to check if a locale is valid
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

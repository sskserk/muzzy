import { PayloadRequest, CollectionSlug } from 'payload'
import nextConfig from 'next.config'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
  locale?: string
}

export const generatePreviewPath = ({ collection, slug, req, locale }: Props) => {
  // Allow empty strings, e.g. for the homepage
  if (slug === undefined || slug === null) {
    return null
  }
  console.debug('Generating preview path for collection:', collection, 'slug:', slug, 'locale:', locale)
  
  // Encode to support slugs with special characters
  const encodedSlug = encodeURIComponent(slug)

  const encodedParams = new URLSearchParams({
    slug: encodedSlug,
    collection,
    path: `${collectionPrefixMap[collection]}/${encodedSlug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `${nextConfig.basePath}/next/preview?${encodedParams.toString()}&locale=${locale || 'en'}`

  console.debug('Generated preview URL:', url);

  return url
}

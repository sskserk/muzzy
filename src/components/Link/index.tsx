'use client'

import { usePathname } from 'next/navigation'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'

const LOCALES = ['en', 'nl', 'ko'] as const
const DEFAULT_LOCALE = 'en'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  const firstSegment = pathSegments[0]
  const hasLocalePrefix = LOCALES.includes(firstSegment as (typeof LOCALES)[number])
  const currentLocale = hasLocalePrefix ? firstSegment : DEFAULT_LOCALE

  const baseHref =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug}`
      : url || ''

  if (!baseHref) return null

  const isExternal = /^https?:\/\//.test(baseHref)
  const alreadyHasLocale =
    LOCALES.some((loc) => baseHref.startsWith(`/${loc}/`)) || isExternal

  const href =  `/${currentLocale}${baseHref.startsWith('/') ? '' : '/'}${baseHref}`

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}

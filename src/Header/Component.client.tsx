'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { HeaderNav } from './Nav'

export interface HeaderClientProps {
  data: Header
  currentLocale?: string
}


const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Dutch', value: 'nl' },
]

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, currentLocale}) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header style={{ border: "1px solid rgb(44, 207, 99)" }} className="container relative z-10   " {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-between">
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <LanguageSwitcher languageOptions={[
          { label: 'English', value: 'en' },
          { label: 'Dutch', value: 'nl' },
        ]} currentLocale={currentLocale || 'en'}/>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}

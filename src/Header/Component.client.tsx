'use client'

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

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, currentLocale}) => {
  /* Storing the value in a useState to avoid hydration errors */
  const pathname = usePathname()

  return (
    <header style={{ border: "1px solid rgb(44, 207, 99)" }} className="container relative z-10   " >
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

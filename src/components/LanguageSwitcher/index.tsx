'use client'

import type { LanguageOptions } from 'payload'
import React from 'react'
import { useTranslation } from '@payloadcms/ui'
import { useRouter, usePathname } from 'next/navigation';

type Props = {
    // Example: [{ label: 'English', value: 'en' }, { label: 'Deutsch', value: 'de' }]
    languageOptions: LanguageOptions
    currentLocale: string
}

export function changeLocale(newLocale: string, currentLocale: string, pathname: string, router: any) {
    // Store user's language preference
    //storeLanguagePreference(newLocale as Locale);
    if (newLocale === currentLocale) {
        return; // No change needed
    }

    const search = window.location.search;
    const searchParams = new URLSearchParams(search);

    // Remove the current locale from the pathname
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);

    console.debug('Navigating to locale:', newLocale, newPath);

    router.push(newPath);
}

export const LanguageSwitcher: React.FC<Props> = ({ languageOptions, currentLocale }) => {
    const { i18n } = useTranslation()
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslation();

    const handleLocaleChange = (newLocale: string) => {
        changeLocale(newLocale, currentLocale, pathname, router);
    }

    return (
        <select
            value={currentLocale}
            onChange={(e) => handleLocaleChange(e.target.value)}
            aria-label="Change language">
            {languageOptions.map((lang) => (
                <option key={lang.value} value={lang.value}>
                    {lang.label}
                </option>
            ))}
        </select>
    )
}
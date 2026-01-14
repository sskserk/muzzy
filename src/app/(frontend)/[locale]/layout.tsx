import type { ReactNode } from 'react'

type LocaleLayoutProps = {
  children: ReactNode
  params: {
    locale: string
  }
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  return (
    <html lang={params.locale}>
      <head>
        {/* <InitTheme /> */}
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        {/* <Providers> */}
        {/* <AdminBar 
            adminBarProps={{
              preview: isEnabled,
            }}
          /> */}

        {/* <Header /> */}
        {/* <Footer /> */}
        {children}
        {/* </Providers> */}
      </body>
    </html>
  )
}

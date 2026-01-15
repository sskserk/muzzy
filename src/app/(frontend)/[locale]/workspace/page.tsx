import { TypedLocale } from 'payload'

type Args = {
  params: Promise<{
    locale?: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale = 'en' } = await paramsPromise

  return (
    <div>
      <h1>Workspace Page - Locale: {locale}</h1>
    </div>
  )
}


import { supportedLocales, defaultLocale } from '@/conf'



export default function getDetectLocale() {
  return (urlPathname: string): string => {
    const pathSegments = urlPathname.split('/').filter(Boolean)
    const firstSegment = pathSegments[0]

    if (supportedLocales.includes(firstSegment)) {
      return firstSegment
    }

    return defaultLocale
  }
}
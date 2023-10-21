import 'tailwindcss/tailwind.css'

import { Analytics } from '@vercel/analytics/react'
import { AppProps } from 'next/app'
import { lazy } from 'react'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('components/preview/PreviewProvider'))

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <>
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
          <Analytics />
        </PreviewProvider>
      ) : (
        <>
          <Component {...pageProps} />
          <Analytics />
        </>
      )}
    </>
  )
}

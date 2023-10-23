import 'tailwindcss/tailwind.css'

import { Analytics } from '@vercel/analytics/react'
import { AppProps } from 'next/app'
import { lazy } from 'react'

import { MenuProvider } from 'context'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('context/preview'))

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <>
      {draftMode ? (
        <PreviewProvider token={token}>
          <MenuProvider>
            <Component {...pageProps} />
            <Analytics />
          </MenuProvider>
        </PreviewProvider>
      ) : (
        <>
          <MenuProvider>
            <Component {...pageProps} />
            <Analytics />
          </MenuProvider>
        </>
      )}
    </>
  )
}

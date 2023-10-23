import { LiveQueryProvider } from 'next-sanity/preview'
import { useMemo } from 'react'

import { getClient } from 'lib/sanity.client'

export interface PreviewProviderProps {
  children: React.ReactNode
  token: string
}

const PreviewProvider = ({ children, token }: PreviewProviderProps) => {
  const client = useMemo(() => getClient({ token }), [token])
  return (
    <LiveQueryProvider client={client} logger={console}>
      {children}
    </LiveQueryProvider>
  )
}

export default PreviewProvider

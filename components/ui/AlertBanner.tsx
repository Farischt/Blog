/* eslint-disable @next/next/no-html-link-for-pages */
import { useSyncExternalStore } from 'react'

import { BlogContainer } from 'components'

const subscribe = () => () => {
  const { searchParams } = new URL(window.location.href)
  return searchParams.get('preview') === 'true'
}

export function AlertBanner({
  preview,
  loading,
}: {
  preview?: boolean
  loading?: boolean
}) {
  const shouldShow = useSyncExternalStore(
    subscribe,
    () => window.top === window,
    () => false,
  )

  if (!shouldShow || !preview) return null

  return (
    <div
      className={`${
        loading ? 'animate-pulse' : ''
      } border-b border-accent-7 bg-accent-7 text-white`}
    >
      <BlogContainer>
        <div className="py-2 text-center text-sm">
          {'Previewing drafts. '}
          <a
            href="/api/disable-draft"
            className="underline transition-colors duration-200 hover:text-cyan"
          >
            Back to published
          </a>
        </div>
      </BlogContainer>
    </div>
  )
}

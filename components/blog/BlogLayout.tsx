import { AlertBanner } from 'components'

export function BlogLayout({
  preview,
  loading,
  children,
}: {
  preview: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  return (
    <>
      <div className="min-h-screen">
        <AlertBanner preview={preview} loading={loading} />
        <main>{children}</main>
      </div>
    </>
  )
}

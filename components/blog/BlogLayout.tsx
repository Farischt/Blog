import Link from 'next/link'
import { useRouter } from 'next/router'

import CrossIcon from 'assets/icons/cross.svg'
import { AlertBanner, BlogContainer, SectionSeparator } from 'components'
import { useMenu } from 'context'
import { Settings } from 'lib/sanity.queries'

interface Props {
  preview: boolean
  loading?: boolean
  settings?: Settings
  children: React.ReactNode
}

const links: { href: string; label: string }[] = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/blog',
    label: 'Blog',
  },
  {
    href: '/authors',
    label: 'Authors',
  },
  {
    href: '/contact',
    label: 'Contact',
  },
]

export const BlogLayout = ({ preview, loading, children, settings }: Props) => {
  const router = useRouter()
  const { open, changeState } = useMenu()

  const isActive = (href: string) => {
    return router.pathname === href
  }

  return (
    <>
      <div className="min-h-screen">
        {open && (
          <BlogContainer>
            <nav className="mt-16 flex items-center justify-between">
              <ul className="flex items-center justify-start gap-[12px]">
                {links.map(({ href, label }) => (
                  <h3
                    key={`${href}${label}`}
                    className={`${
                      isActive(href) && 'underline'
                    } text-2xl font-semibold leading-tight tracking-tight transition-transform duration-300 ease-in-out hover:translate-y-[-4px] md:text-4xl md:tracking-tighter`}
                  >
                    <Link href={href}>{label}</Link>
                  </h3>
                ))}
              </ul>

              {open && (
                <CrossIcon
                  fill={'#000000'}
                  className="h-10 w-10 cursor-pointer"
                  onClick={changeState}
                />
              )}
            </nav>
          </BlogContainer>
        )}
        <AlertBanner preview={preview} loading={loading} />
        <main>{children}</main>

        <BlogContainer>
          <SectionSeparator />
          <footer className="-mt-8 mb-8 flex flex-col  items-center justify-between md:flex-row">
            {settings?.title && (
              <div>
                <h3 className="text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
                  {settings.title}
                </h3>
              </div>
            )}
            <div>
              <p className="text-lg font-light leading-tight tracking-tight md:text-xl md:tracking-tighter">
                © All right reserved {new Date().getFullYear()}
              </p>
            </div>
          </footer>
        </BlogContainer>
      </div>
    </>
  )
}

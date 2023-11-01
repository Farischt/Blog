import { Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'

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

  const [_, setUlRefHeight] = useState(0)
  const ulRef = useRef(null)

  const isActive = useCallback(
    (href: string) => {
      return href === router.pathname
    },
    [router],
  )

  useEffect(() => {
    if (ulRef.current) {
      setUlRefHeight(ulRef.current.offsetHeight)
    }
  }, [ulRef])

  return (
    <>
      <div className="min-h-screen">
        <BlogContainer>
          <Transition
            show={open}
            enter="transition-all duration-700 ease"
            enterFrom="w-full h-0 mt-0 opacity-0"
            enterTo={`w-full h-[121px] mt-8 opacity-100`}
            leave="transition-all duration-700 ease"
            leaveFrom="w-full h-[121px] mt-8 opacity-100"
            leaveTo="w-full h-0 mt-0 opacity-0"
          >
            <nav className="flex items-start justify-between">
              <ul
                ref={ulRef}
                className="flex flex-col items-start justify-start gap-[2px]"
              >
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

              <CrossIcon
                fill="#000000"
                className="h-10 w-10 cursor-pointer"
                onClick={changeState}
              />
            </nav>
          </Transition>
        </BlogContainer>

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

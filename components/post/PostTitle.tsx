import { forwardRef } from 'react'

type Props = {
  children: React.ReactNode
}

export const PostTitle = forwardRef(
  ({ children }: Props, ref: React.ForwardedRef<HTMLHeadingElement>) => {
    return (
      <h1
        ref={ref}
        className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-9xl"
      >
        {children}
      </h1>
    )
  },
)

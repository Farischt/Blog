export const scrollToRef = <T extends HTMLElement>(
  ref?: React.RefObject<T>,
) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }
}

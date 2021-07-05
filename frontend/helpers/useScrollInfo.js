import { useRef, useEffect } from 'react'

const isBrowser = typeof window !== `undefined`

const getScrollPosition = ({ element = false, useWindow }) => {
  if (!isBrowser) return { x: 0, y: 0 }

  const target = element ? element.current : document.body
  const position = target ? target.getBoundingClientRect() : { x: 0, y: 0 }

  return useWindow ? { x: window.scrollX, y: window.scrollY } : { x: position.left, y: position.top }
}

export const useScrollInfo = (effect, deps, element, useWindow, wait) => {
  const position = useRef(getScrollPosition({ useWindow }))

  useEffect(() => {
    if (!isBrowser) {
      return
    }
    let throttleTimeout = null
    const callBack = () => {
      const currPos = getScrollPosition({ element, useWindow })
      effect({ prevPos: position.current, currPos })
      position.current = currPos
      throttleTimeout = null
    }

    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
    
  }, [deps, effect, element, useWindow, wait])
}

useScrollInfo.defaultProps = {
  deps: [],
  element: false,
  useWindow: false,
  wait: null,
}

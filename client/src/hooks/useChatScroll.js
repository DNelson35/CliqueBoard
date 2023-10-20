import React, { useRef, useEffect } from 'react'

function useChatScroll(messages) {
    const ref = useRef()
    useEffect(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight
      }
    }, [messages, ref])
  return ref
}

export default useChatScroll
import { useRef, useEffect } from 'react'

function useChatScroll(messages, chat) {
    const ref = useRef()
    useEffect(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight
      }
    }, [messages, ref, chat])
  return ref
}

export default useChatScroll
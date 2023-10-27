import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import cable from '../Cable'
import { addConversation } from '../reducers/conversationSlice'

function MessengerReciver() {

    const dispatch = useDispatch()

  useEffect(() => {
    const subscription = cable.subscriptions.create('MessengerChannel', {
      received: (data) => {
        // dispatch(addInvite(data.invitation))
        dispatch(addConversation(data.chat))
      },
    })

    return () => {
      cable.subscriptions.remove(subscription)
    }
  }, [dispatch])
  return (
    <></>
  )
}

export default MessengerReciver
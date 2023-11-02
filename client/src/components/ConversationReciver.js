import React, { useEffect} from 'react'
import { useDispatch } from 'react-redux'
import cable from '../Cable'
import { addMessage, deleteMessage } from '../reducers/conversationSlice'

function ConversationReciver() {

    const dispatch = useDispatch()
    useEffect(() => {
    const subscription = cable.subscriptions.create('ConversationChannel', {
            received: (data) => {
              console.log(data)
              if(data.action){
                dispatch(deleteMessage(data))
              } else {
                dispatch(addMessage(data))
              }
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

export default ConversationReciver
import React, { useEffect} from 'react'
import { useDispatch } from 'react-redux'
import cable from '../Cable'
import { addMessage, deleteMessage, updateMessage } from '../reducers/conversationSlice'

function ConversationReciver() {

    const dispatch = useDispatch()
    useEffect(() => {
    const subscription = cable.subscriptions.create('ConversationChannel', {
            received: (data) => {
              if(data.action === 'Delete'){
                dispatch(deleteMessage(data))
              } else if(data.action === 'Update'){
                console.log(data)
                dispatch(updateMessage(data))
              }else {
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
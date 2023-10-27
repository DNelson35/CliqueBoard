import React, { useEffect} from 'react'
import { useDispatch } from 'react-redux'
import cable from '../Cable'
import { useSelector } from 'react-redux'
import { addMessage } from '../reducers/conversationSlice'

function ConversationReciver({chat}) {

    const dispatch = useDispatch()
    useEffect(() => {
    const subscription = cable.subscriptions.create({ channel: 'ConversationChannel', id: chat?.id}, {
            received: (data) => {

              dispatch(addMessage(data))
              
            },
        })

        return () => {
        cable.subscriptions.remove(subscription)
        }
    }, [chat?.id, dispatch])

  return (
    <></>
  )
}

export default ConversationReciver
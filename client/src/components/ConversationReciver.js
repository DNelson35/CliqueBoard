import React, { useEffect} from 'react'
import { useDispatch } from 'react-redux';
import cable from '../Cable';
import { useSelector } from 'react-redux';
import { addMessage } from '../reducers/userSlice';

function ConversationReciver() {

  const conversation = useSelector((state) => state.user.conversation)

    const dispatch = useDispatch()

    useEffect(() => {
    const subscription = cable.subscriptions.create({ channel: 'ConversationChannel', id: conversation?.id}, {
            received: (data) => {

              dispatch(addMessage(data))
              
            },
        });

        return () => {
        cable.subscriptions.remove(subscription);
        };
    }, [conversation?.id, dispatch]);

  return (
    <></>
  )
}

export default ConversationReciver
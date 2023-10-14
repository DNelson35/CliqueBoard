import React, { useEffect } from 'react'
import cable from '../Cable';
import { setOnlineUsers } from '../reducers/userSlice';
import { useDispatch } from 'react-redux';
function OnlineUsersReceiver() {
    // const [onlineUsers, setOnlineUsers] = useState(null)
    // if i set this in redux i can use it in the groups to show if the users in a group are also online or offline by having a useEffect that triggers anytime the state changes for the online users and have it show a online or offline message if any of the users are in the online users state.
    const dispatch = useDispatch()
    useEffect(() => {
        const subscription = cable.subscriptions.create('OnlineUsersChannel', {
          received: (data) => {
            dispatch(setOnlineUsers(data.users))
          },
        })

        return () => {
          cable.subscriptions.remove(subscription);
        }

    }, [dispatch])
    
  return (
    <></>
    
  )
}

export default OnlineUsersReceiver
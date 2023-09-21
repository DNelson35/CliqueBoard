import React, { useEffect, useState } from 'react'
import cable from '../Cable';

function OnlineUsersReceiver() {
    const [onlineUsers, setOnlineUsers] = useState(null)
    // if i set this in redux i can use it in the groups to show if the users in a group are also online or offline by having a useEffect that triggers anytime the state changes for the online users and have it show a online or offline message if any of the users are in the online users state.
    useEffect(() => {
        const subscription = cable.subscriptions.create('OnlineUsersChannel', {
          received: (data) => {
            setOnlineUsers(data.users)
          },
        });
        return () => {
          cable.subscriptions.remove(subscription);
        };
    }, []);

    const onlineUsersList = onlineUsers?.map(user => <p key={user.id}>{user.name}</p>)
  return (
    <div>{onlineUsersList}</div>
  )
}

export default OnlineUsersReceiver
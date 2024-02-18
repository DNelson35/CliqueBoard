import React, { useEffect } from 'react'
import cable from '../../Cable'
import { setOnlineUsers } from '../../reducers/userSlice'
import { useDispatch, useSelector } from 'react-redux'
function OnlineUsersReceiver() {
    const dispatch = useDispatch()
    const groups = useSelector((state) => state.groups.groups)
    useEffect(() => {
        const subscription = cable.subscriptions.create('OnlineUsersChannel', {
          received: (data) => {
            dispatch(setOnlineUsers(data.users))
          },
        })

        return () => {
          cable.subscriptions.remove(subscription)
        }

    }, [dispatch, groups])
    
  return (
    <></>
    
  )
}

export default OnlineUsersReceiver
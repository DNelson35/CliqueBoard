import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUserToGroup } from '../reducers/groupSlice'
import cable from '../Cable'

function JoinedUserReciver() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

  useEffect(() => {
    const subscription = cable.subscriptions.create('JoinedUserChannel', {
      received: (data) => {
        if (data.user.id !== user.id){
          dispatch(addUserToGroup({data: data.user, group: data.group}))
        } 
      },
    })

    return () => {
      cable.subscriptions.remove(subscription)
    }
  }, [dispatch, user.id])

  return (
    <></>
  )
}

export default JoinedUserReciver
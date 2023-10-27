import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { addUserToGroup } from '../reducers/groupSlice'
import cable from '../Cable'

function JoinedUserReciver({ group }) {
    const dispatch = useDispatch()

  useEffect(() => {
    const subscription = cable.subscriptions.create({channel: 'JoinedUserChannel', group_id: group?.id}, {
      received: (data) => {
        console.log(data)
        console.log(group)
        dispatch(addUserToGroup({data: data, group: group}))
      },
    })

    return () => {
      cable.subscriptions.remove(subscription)
    }
  }, [group?.id, dispatch, group])

  return (
    <></>
  )
}

export default JoinedUserReciver
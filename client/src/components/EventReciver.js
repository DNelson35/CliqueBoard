import React, { useEffect} from 'react'
import { useDispatch } from 'react-redux'
import cable from '../Cable'
import { addCalendarEvent } from '../reducers/groupSlice'

function EventReciver({ group }) {
    const dispatch = useDispatch()
    
    useEffect(() => {
        const subscription = cable.subscriptions.create({ channel: 'EventChannel', group_id: group?.id }, {
            received: (data) => {
                dispatch(addCalendarEvent(data))
            },
        })

        return () => {
        cable.subscriptions.remove(subscription)
        }
    }, [group?.id, dispatch])

    console.log(group)

    return (
        <></>
    )
}

export default EventReciver
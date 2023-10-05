import React, { useEffect} from 'react'
import { useDispatch } from 'react-redux';
import cable from '../Cable';
import { addCalendarEvent } from '../reducers/groupSlice';

function EventReciver({ group }) {
    const dispatch = useDispatch()
    const groupId = group.id
    // TODO: im not reciving data for the event for the current user and im not sure how to test this for other users since the data is part of the group so any user that is in the group will recive this data on refresh.

    useEffect(() => {
        const subscription = cable.subscriptions.create({ channel: 'EventChannel', group_id: group.id }, {
            received: (data) => {
                dispatch(addCalendarEvent(data))
            },
        });

        return () => {
        cable.subscriptions.remove(subscription);
        };
    }, [group.id, dispatch]);

    console.log(group)

    return (
        <></>
    )
}

export default EventReciver
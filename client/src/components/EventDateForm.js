import React, { useState } from 'react'
import { useCreateEventMutation } from '../api/groupApi'

function EventDateForm({ eventArg, group }) {
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        start_date: `${eventArg.startStr}`,
        end_date: `${eventArg.endStr}`,
        group_id: group.id,
        name: "Calendar",
        data_key: 'none',
        data_value: 'none',
        event_group: group.group_name
    })

    const [createEvent] = useCreateEventMutation()

    const {title, description, start_date, end_date} = eventData
    const handleChange = (e) => {
        setEventData({...eventData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const  newEvent = await createEvent(eventData)
    }

  return (
    <div className='flex fixed top-0 left-1/2 -translate-x-[50%] z-50 border border-black w-1/3 h-auto justify-center bg-white'>
        <form className='flex flex-col' onSubmit={handleSubmit}>
            <label>title</label>
            <input type="text" name='title' placeholder='insert title' value={title} onChange={handleChange}/>
            <label>description</label>
            <input type="text-box" name='description' placeholder='describe your event' value={description} onChange={handleChange}/>
            <label>start date</label>
            <input type="text" name='start_date' value={start_date} onChange={handleChange}/>
            <label>end date</label>
            <input type="text" name='end_date' value={end_date} onChange={handleChange}/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default EventDateForm
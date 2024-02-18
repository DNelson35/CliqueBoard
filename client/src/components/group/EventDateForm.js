import React, { useState } from 'react'
import { useCreateEventMutation } from '../../api/groupApi'

function EventDateForm({ eventArg, group, setIsOpen }) {
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
        await createEvent(eventData)
        setIsOpen(false)
    }

  return (
    <div className='w-full bg-slate-800 h-full justify-center'>
        <div className='flex justify-center'>
            <form className='flex space-x-3 text-xl mt-20 text-white' onSubmit={handleSubmit}>
                <label>title:</label>
                <input className='text-black placeholder-slate-500 outline-purple-400'  type="text" name='title' placeholder='insert title' value={title} onChange={handleChange}/>
                <label>description:</label>
                <input className='text-black placeholder-slate-500 outline-purple-400' type="text-box" name='description' placeholder='describe your event' value={description} onChange={handleChange}/>
                <label>start date:</label>
                <input className='text-black placeholder-slate-500 outline-purple-400'  type="text" name='start_date' value={start_date} onChange={handleChange}/>
                <label>end date:</label>
                <input className='text-black placeholder-slate-500 outline-purple-400'  type="text" name='end_date' value={end_date} onChange={handleChange}/>
                <button className='bg-blue-400 rounded-full px-2' type='submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default EventDateForm
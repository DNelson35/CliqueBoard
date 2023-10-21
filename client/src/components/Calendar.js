import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
// import { useSelector } from 'react-redux'
import EventReciver from './EventReciver'
function Calendar({ group, setEventArg, setIsOpen, isOpen }) {

  const handleDateClick = (arg) => {
    setEventArg(arg)
    setIsOpen(!isOpen)
  }

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  const events = group.widgets.Calendar?.map(event => (
    {
      start: `${event.start_date}`,
      end: `${event.end_date}`,
      title: `${event.title}`
    }
  ))

  return (
    <div className='w-[85%] ml-20'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        // dateClick={handleDateClick}
        selectable={true}
        select={handleDateClick}
        events={events}
        eventContent={renderEventContent}
        height={'auto'}
      />
      <EventReciver group={group}/>
    </div>
  )
}

export default Calendar

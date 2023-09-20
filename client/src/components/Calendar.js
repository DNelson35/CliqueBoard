import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

function Calendar() {
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  return (
    <div className='w-[85%] ml-20'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        dateClick={handleDateClick}
        events={[
          { title: 'event 1', date: '2021-05-07' },
          { title: 'event 2', date: '2021-05-17' }
        ]}
        eventContent={renderEventContent}
        height={'auto'}
      />
    </div>
  );
}

export default Calendar;

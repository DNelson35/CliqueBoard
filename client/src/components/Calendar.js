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
        weekends={true}
        dateClick={handleDateClick}
        events={[
          { title: 'event 1', date: '2023-09-07' },
          { title: 'event 3', date: '2023-09-07' },
          { title: 'event 2', date: '2023-09-17' },
          { title: 'event 4', date: '2023-09-17' },
        ]}
        eventContent={renderEventContent}
        height={'auto'}
      />
    </div>
  );
}

export default Calendar;

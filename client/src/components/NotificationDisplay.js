import React, { forwardRef } from 'react'
import Notification from './Notification'

function NotificationDisplay({notifcationOpen, user, forwardRef}) {
    

    const notifications = user.received_invitations?.map(note =>(
        <Notification note={note} key={note.id}/>
    ))

  return (
    <div ref={forwardRef} className={`fixed top-[32.5%] z-10 left-0 h-auto w-1/4 bg-slate-700 transition-all duration-300 overflow-auto max-h-[25%] py-2 px-2 border border-black ${notifcationOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {notifications.length > 0 ? notifications : <div className='text-xl text-white font-bold text-center'>No New Notifications</div>}
    </div>
  )
}

export default NotificationDisplay
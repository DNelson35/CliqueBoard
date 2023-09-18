import React from 'react'
import Notification from './Notification'

function NotificationDisplay({notifcationOpen, user}) {
    

    const notifications = user.received_invitations?.map(note =>(
        <Notification note={note} key={note.id}/>
    ))

  return (
    <div className={`fixed top-[30%] left-0 h-auto w-1/4 bg-slate-700 transition-all duration-300 overflow-auto max-h-[25%] py-2 px-2 border border-black ${notifcationOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {notifications}
    </div>
  )
}

export default NotificationDisplay
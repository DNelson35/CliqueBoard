import React, { useState } from 'react'

function Notification({note}) {
    const [open, setOpen] = useState(false)

  return (
    <div className='flex text-justify ml-20 mb-1 pr-2 pl-2 border border-black ' onClick={() => setOpen(!open)}>
        <p>{open? note.message : `${note.message.substring(0,40)}...`}</p>
    </div>
  )
}

export default Notification
import React from 'react'

function Logo({bgColor}) {
    const containerStyle = `relative h-10 w-10 border-8 rounded-lg border-purple-400`
    const innerStyle = `absolute border-4 h-3/4 w-3/4 -top-1/2 left-[75%] rounded-full border-blue-400  bg-${bgColor}`

  return (
    <div className={containerStyle}>
        <div className={innerStyle}></div>
    </div>
  )
}

export default Logo
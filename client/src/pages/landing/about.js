import React from 'react'

function About() {
  return (
    <div className='flex justify-center h-screen w-full bg-slate-700 text-white'>
        <div className='flex-col h-auto w-1/2'>
            <h1 className='mt-10 text-6xl text-center mb-5'>CliqueBoard</h1>
            <p className='text-2xl'>CliqueBoard was designed as a group management application. the developer of CliqueBoard, Damien Nelson, originally designed the app for family to be able to schedule and coordinate events through family groups. The idea was inspired by his Wife. Together they came up with the idea for the application to help their family keep up to date with travel, family, and daily events through their family. Before the application keeping the family on the same page was a chore. So when they came together they though of CliquBoard and application to help groups stay on the same page when it comes to planning events.</p>

            <h1 className='mt-10 text-6xl text-center mb-5'>Meet the Dev</h1>
            <p className='text-2xl'>Hi, my name is Damien Nelson. I am the designer and Creator of CliqueBoard. I Have been coding and building projects for the last year. Before I became a softwear engineer I was a general labor working my way through college. While I attended college I happend to take a course on Python and this experince sparked my passion for programming. After learning the basics of python I decided I wanted to learn more so I signed up for Flatiorn a coding bootcamp here I became a React and Rails developer. Learning to code has been one of the best experinces of my life so far and im excited to continue to learn and grow so i can keep producing exciting and more robust applications for you.  </p>
        </div>
    </div>
  )
}

export default About
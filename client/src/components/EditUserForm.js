import React, {useState} from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { FiEdit2 } from 'react-icons/fi'

function EditUserForm({setEdit}) {
    const user = useSelector(state => state.user.user)
  return (
    <div className='flex justify-center items-center w-screen h-screen bg-slate-900'>
      <div className='flex justify-center items-center w-1/2 h-auto'>
        <div className='flex justify-center items-center bg-slate-700 w-1/2 h-full rounded-xl z-10'>
          <form className='flex flex-col w-3/4 my-5 text-xl text-white '>
            <div className='flex space-x-1 justify-center'>
                <h1 className='text-2xl text-center font-bold'>Edit User</h1>
                <FiEdit2 className=' self-end text-lg' onClick={() => setEdit(false)}/>
            </div>
            <label>Name</label>
            <input className='text-black my-3' type='text' placeholder={user.name}></input>
            <label>Username</label>
            <input className='text-black my-3' type='text' placeholder={user.username}></input>
            <label>Age</label>
            <input className='text-black my-3' type='text' placeholder={user.age}></input>
            <label>Email Address</label>
            <input className='text-black my-3' type='text' placeholder={user.email_address}></input>
            <button className='h-auto w-auto p-3 bg-blue-400 rounded-lg  mt-5'>Submit</button>
          </form>
        </div>
      </div>
   </div>
  )
}

export default EditUserForm
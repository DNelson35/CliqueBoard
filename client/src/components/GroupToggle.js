import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCreateGroupsMutation } from '../api/groupApi'
import { addGroupToUser } from '../reducers/userSlice'

function GroupToggle({isOpen}) {
    const user = useSelector(state => state.user.user)
    const [isOn, setIsOn] = useState(false)
    const [createGroup] = useCreateGroupsMutation()
    const [groupInfo, setGroupInfo] = useState({
        name:'',
        description: ''
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const groups = user.groups?.map(group => (
        <div key={group.id} className='flex justify-center my-2'>
            <div className='bg-slate-700 w-1/2 h-10'>
                <h1 className='text-white font-bold' onClick={() => navigate(`/group/${group.id}`)}>{group.name}</h1>
            </div>
        </div>
    ))

    const handleChange = (e) => {
        setGroupInfo({...groupInfo, [e.target.name]: e.target.value})
    }

    const handleGroupSubmit = async (e) => {
        e.preventDefault()
        const newGroup = await createGroup(groupInfo)
        dispatch(addGroupToUser(newGroup.data))
    }
    

  return (
    <div className={`fixed top-0 left-0 h-screen w-1/5 bg-gray-200 transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='flex justify-end'>
            <button className='w-20 h-10 rounded-lg bg-purple-400 m-3' onClick={() => setIsOn(!isOn)}>+ Group</button>
        </div>
        {isOn? 
            <form className='flex justify-center' onSubmit={handleGroupSubmit}>
                <div className='flex flex-col w-1/2'>
                    <label>name</label>
                    <input name='name' onChange={handleChange}/>
                    <label>description</label>
                    <input name='description' onChange={handleChange} />
                    <button type='submit' className='w-1/2 h-1/2 bg-purple-400 rounded-full self-center my-3'>Submit</button>
                </div>
            </form> : null}
        <div className='flex flex-col'>
            <div className='flex justify-center'>
                <h1 className='ml-10'>Groups</h1>
            </div>
            {groups}
        </div> 
    </div>
  )
}

export default GroupToggle
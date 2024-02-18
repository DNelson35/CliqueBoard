import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCreateGroupsMutation } from '../../api/groupApi'
import { addGroupToUser } from '../../reducers/userSlice'
import { addConversation } from '../../reducers/conversationSlice'

function GroupToggle({isOpen}) {
    const user = useSelector(state => state.user.user)
    const groups = useSelector(state => state.groups.groups)
    const [isOn, setIsOn] = useState(false)
    const [createGroup] = useCreateGroupsMutation()
    const [groupInfo, setGroupInfo] = useState({
        group_name:'',
        description: ''
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    const groupsList = groups?.map(group => (
        <div key={group.id} className='flex justify-center my-2'>
            <div className='flex justify-center  items-center bg-slate-700 hover:bg-slate-800 w-1/2 h-10 rounded-xl'>
                <h1 className='text-white font-bold' onClick={() => navigate(`/group/${group.id}`)}>{group.group_name}</h1>
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
        dispatch(addConversation(newGroup.data.conversation))
    }
    
  return (
    <div className={`fixed top-0 left-0 h-screen w-1/5 bg-slate-500 transition-all duration-300 z-10 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='flex justify-end'>
            <button className='w-20 h-10 rounded-lg bg-purple-400 hover:bg-purple-500 active:bg-purple-600 m-3 text-white' onClick={() => setIsOn(!isOn)}>+ Group</button>
        </div>
        {isOn? 
            <form className='flex justify-center' onSubmit={handleGroupSubmit}>
                <div className='flex flex-col w-1/2'>
                    <label>name</label>
                    <input name='group_name' onChange={handleChange} className='border border-purple-300 focus:outline-purple-400'/>
                    <label>description</label>
                    <input name='description' onChange={handleChange} className='border border-purple-300 focus:outline-purple-400' />
                    <button type='submit' className='w-1/2 h-1/2 bg-purple-400 hover:bg-purple-500 active:bg-purple-600 rounded-full self-center my-3'>Submit</button>
                </div>
            </form> : null}
        <div className='flex flex-col'>
            <div className='flex justify-center'>
                <h1 className='ml-10 mb-5 border-b-2 border-b-gray-400 text-white font-bold text-xl'>Groups</h1>
            </div>
            {groupsList}
        </div>
    </div>
  )
}

export default GroupToggle
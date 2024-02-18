import { useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate  } from 'react-router-dom'
import { useSignOutUserMutation } from '../../api/authApi.js'
import { RxDashboard } from 'react-icons/rx'
import { TbUserCircle, TbMessageCircle2 } from 'react-icons/tb'
import { FaGripLinesVertical } from 'react-icons/fa'
import { CgLogOut } from 'react-icons/cg'
import Logo from '../profile/Logo.js'
import GroupToggle from '../sidebar/GroupToggle.js'
import InvitationReceiver from '../receivers/InvitationReciver.js'
import NotificationDisplay from '../sidebar/NotificationDisplay.js'
import ConversationReciver from '../receivers/ConversationReciver.js'
import MessengerReciver from '../receivers/MessengerReciver.js'
import EventReciver from '../receivers/EventReciver.js'
import JoinedUserReciver from '../receivers/JoinedUserReciver.js'


function Nav() {
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()
    const [signOut] = useSignOutUserMutation()
    const ref = useRef()

    const [isOpen, setIsOpen] = useState(false)
    const [notifcationOpen, setNotificationOpen] = useState(false)

    const toggleVerticalBar = () => {
        setIsOpen(!isOpen)
    }

    const logOut = async () => {
        await signOut()
        navigate('/')
    }

    useEffect(() => {
        const closeNotifications = (e) => {
            if (!ref.current?.contains(e.target) && !e.target.closest('.notification-icon')) {
              setNotificationOpen(false)
            }
          }
      
        document.addEventListener('mousedown', closeNotifications)
      
        return () => {
          document.removeEventListener('mousedown', closeNotifications)
        }
      }, [])

    return (
        <>
            {user? ( 
                <div>
                    <nav className="flex flex-col fixed bg-slate-700 p-4 h-screen w-20 z-20">
                        <div className="flex-wrap justify-center text-white mb-20">
                            <Logo bgColor={'slate-700'}/>
                            <h1 className="text-lg font-bold ml-2">CB</h1>
                        </div>
                        <div className="flex flex-col gap-4 mt-auto mb-auto space-y-10">
                            <InvitationReceiver user={user} open={notifcationOpen} setOpen={setNotificationOpen}/>
                            <RxDashboard title='dashboard' onClick={() => navigate('/dashboard')} className='text-white text-3xl' />
                            <TbUserCircle title='profile' onClick={() => navigate('/profile')} className='text-white text-3xl'/>
                            <TbMessageCircle2 className='text-white text-3xl' onClick={() => navigate('/messenger')}/>
                        </div>
                        <div className="mt-auto">
                            <CgLogOut title='logout' onClick={() => logOut()} className='text-white text-3xl'/>
                        </div>
                        <FaGripLinesVertical onClick={toggleVerticalBar} className='absolute top-1/2 right-0 text-white text-2xl'/>
                    </nav>
                    <GroupToggle isOpen={isOpen}/>
                    <NotificationDisplay forwardRef={ref} notifcationOpen={notifcationOpen} user={user}/>
                    <ConversationReciver />
                    <MessengerReciver/>
                    <EventReciver/>
                    <JoinedUserReciver/>
                </div>
            ) : (
                
                <nav className="flex justify-between items-center bg-white p-4">
                    <div className="text-black flex">
                        <Logo bgColor={'white'}/>
                        <h1 className="text-lg font-bold pl-5 pt-1.5">CliqueBoard</h1>
                    </div>
                    <div className="flex gap-4">
                        <NavLink to='/' className="text-black">Welcome</NavLink>
                        <NavLink to='/about' className="text-black">About</NavLink>
                        <NavLink to='/future' className="text-black">Future</NavLink>
                    </div>
                    <div className='flex space-x-3'>
                        <NavLink to='/login' className="bg-blue-600 text-white px-4 py-2 rounded">Login</NavLink>
                        <NavLink to='/signup' className="bg-blue-600 text-white px-4 py-2 rounded">Signup</NavLink>
                    </div>
                </nav>
                
            )}
        </>
    )
}

export default Nav

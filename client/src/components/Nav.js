import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'


function Nav() {
    const user = useSelector(state => state.user)
    const { signOut } = useAuth()
    
    return (
        <>
            {user ? ( 
                <nav className="flex flex-col bg-blue-500 p-4 h-screen w-40">
                    <div className="text-white mb-20">
                        <h1 className="text-lg font-bold">App Title</h1>
                        <p>Logo</p>
                    </div>
                    <div className="flex flex-col gap-4 mt-auto mb-auto space-y-10">
                        <NavLink className="text-white">Logo</NavLink>
                        <NavLink className="text-white">Profile Pic</NavLink>
                        <NavLink className="text-white">Groups</NavLink>
                        <NavLink className="text-white">Create Group</NavLink>
                        <NavLink className="text-white">Manage Groups</NavLink>
                    </div>
                    <div className="mt-auto">
                        <button className="bg-white text-blue-500 px-4 py-2 rounded" onClick={signOut}>Sign Out</button>
                    </div>
                </nav>
            ) : (
                <nav className="flex justify-between items-center bg-blue-500 p-4">
                    <div className="text-white">
                        <h1 className="text-lg font-bold">App Title</h1>
                        <p>Log</p>
                    </div>
                    <div className="flex gap-4">
                        <NavLink className="text-white">Welcome</NavLink>
                        <NavLink className="text-white">About</NavLink>
                        <NavLink className="text-white">Future</NavLink>
                    </div>
                    <div>
                        <NavLink to='/auth' className="bg-white text-blue-500 px-4 py-2 rounded">Login</NavLink>
                        <NavLink className="bg-white text-blue-500 px-4 py-2 rounded">Signup</NavLink>
                    </div>
                </nav>
            )}
        </>
    )
}

export default Nav

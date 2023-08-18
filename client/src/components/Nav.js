import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSignOutUserMutation } from '../api/authSlice.js'


function Nav() {
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()
    const [signOut] = useSignOutUserMutation()
    

    const logOut = async () => {
        await signOut()
        navigate('/')
    }

    return (
        <>
            {user? ( 
                <nav className="flex flex-col absolute bg-blue-500 p-4 h-screen w-40">
                    <div className="text-white mb-20">
                        <h1 className="text-lg font-bold">CliqueBoard</h1>
                        <p>Logo</p>
                    </div>
                    <div className="flex flex-col gap-4 mt-auto mb-auto space-y-10">
                        <NavLink className="text-white">Logo</NavLink>
                        <NavLink className="text-white">Profile Pic</NavLink>
                        <NavLink to='/groups' className="text-white">Groups</NavLink>
                        <NavLink className="text-white">Create Group</NavLink>
                        <NavLink className="text-white">Manage Groups</NavLink>
                    </div>
                    <div className="mt-auto">
                        <button className="bg-white text-blue-500 px-4 py-2 rounded" onClick={logOut}>Sign Out</button>
                    </div>
                </nav>
            ) : (
                <nav className="flex justify-between items-center bg-white p-4">
                    <div className="text-black">
                        <h1 className="text-lg font-bold">CliqueBoard</h1>
                        <p>Log</p>
                    </div>
                    <div className="flex gap-4">
                        <NavLink className="text-black">Welcome</NavLink>
                        <NavLink className="text-black">About</NavLink>
                        <NavLink className="text-black">Future</NavLink>
                    </div>
                    <div>
                        <NavLink to='/login' className="bg-blue-600 text-white px-4 py-2 mr-5 rounded">Login</NavLink>
                        <NavLink to='/signup' className="bg-blue-600 text-white px-4 py-2 rounded">Signup</NavLink>
                    </div>
                </nav>
            )}
        </>
    )
}

export default Nav

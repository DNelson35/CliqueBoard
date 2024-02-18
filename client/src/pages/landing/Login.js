import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginUserMutation} from "../../api/authApi"


const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState(null)

  const [login ] = useLoginUserMutation()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    const user = await login(formData)
    if(user.error){
      setError(user.error)
    }else{
      navigate('/')
    }
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  } 

  return (
    <div className="h-screen flex bg-slate-700">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-gray-200 shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium mb-5 text-center">
          Log in to your account 🔐
        </h1>
        <form onSubmit={onSubmit}>
            <label>username</label>
            <input
              className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              name='username'
              placeholder="john smith" onChange={handleChange}
            />
            <label>Password</label>
            <input
              type="password"
              className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              name='password'
              placeholder="Your Password"
              onChange={handleChange}
            />
            {error? <p className='text-red-500 mb-3'>{error.data.errors}</p> : null}
            <div className='flex justify-center'>
              <button type='submit' className=" bg-blue-400 py-2 px-4 text-sm text-white rounded hover:bg-blue-500 active:bg-blue-600 ">
                Login
              </button>
            </div>
            <p className=' text-center mt-3'>Don't have an account <span className='text-blue-500 cursor-pointer' onClick={() => navigate('/signup')}>Sign Up</span></p>
      </form>
    </div>
  </div>
  )
}

export default Login

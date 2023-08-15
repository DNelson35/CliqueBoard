import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation} from "../../api/authSlice";


const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const [login ] = useLoginUserMutation()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    await login(formData)
    navigate('/profile')
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  } 

  return (
    <div className="h-screen flex bg-gray-100">
    <div className="w-full max-w-md m-auto bg-white rounded-lg border border-gray-200 shadow-default py-10 px-16">
      <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
        Log in to your account 🔐
      </h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>username</label>
          <input
            className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            name='username'
            placeholder="john smith" onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            name='password'
            placeholder="Your Password"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center items-center mt-6">
          <button type='submit' className="bg-green py-2 px-4 text-sm text-black rounded border border-green focus:outline-none focus:border-green-dark">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
  )
};

export default Login;

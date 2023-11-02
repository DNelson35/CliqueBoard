import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignUpUserMutation } from '../../api/authApi'

function Signup() {

    const [formData, setFormData] = useState({
        username: '',
        email_address: '',
        name: '',
        age: '',
        password: '',
        password_confirmation: '',
    })

    const [error, setError] = useState({
      username: null,
      name: null,
      age: null,
      email_address: null,
      password: null,
    })
    const [ signUp ] = useSignUpUserMutation()
    const navigate = useNavigate()

    const handleErrors = (errors) => {
      errors.data.errors.forEach(err => {
        if (err.includes('Username')){
          setError(prevError => ({...prevError, username: err}))
        } else if (err.includes('Email address')){
          setError(prevError => ({...prevError, email_address: err}))
        } else if (err.includes('Age')){
          setError(prevError => ({...prevError, age: err}))
        } else if (err.includes('Name')){
          setError(prevError => ({...prevError, name: err}))
        } else if (err.includes('Password')){
          setError(prevError => ({...prevError, password: err}))
        }
      })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setError({
          username: null,
          name: null,
          age: null,
          email_address: null,
          password: null,
        })
       const user =  await signUp(formData)
       if(user.error){
        handleErrors(user.error)
       } else {
        navigate('/')
       }  
    }

    console.log(error)
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    } 

  return (
    <div className="h-screen flex bg-slate-700">
    <div className="w-full max-w-md m-auto bg-white rounded-lg border border-gray-200 shadow-default py-10 px-16">
      <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
        Create an account 🔐
      </h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>username</label>
          <input
            className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            name='username'
            placeholder="john smith" onChange={handleChange}
          />
          {error.username? <p className='text-red-500 mb-3'>{error.username}</p> : null}
        </div>
        <div>
          <label>Email Address</label>
          <input
            className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            name='email_address'
            placeholder="johnsmith@test.com" onChange={handleChange}
          />
          {error.email_address? <p className='text-red-500 mb-3'>{error.email_address}</p> : null}
        </div>
        <div>
          <label>Name</label>
          <input
            className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            name='name'
            placeholder="john" onChange={handleChange}
          />
          {error.name? <p className='text-red-500 mb-3'>{error.name}</p> : null} 
        </div>
        <div>
          <label>age</label>
          <input
            className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            name='age'
            placeholder="30" onChange={handleChange}
          />
          {error.age? <p className='text-red-500 mb-3'>{error.age}</p> : null}
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
        <div>
          <label>Password Confirmation</label>
          <input
            type="password"
            className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            name='password_confirmation'
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          {error.password? <p className='text-red-500 mb-3'>{error.password}</p> : null}
        </div>
        <div className="flex justify-center items-center mt-6">
          <button type='submit' className="bg-blue-400 py-2 px-4 text-sm text-white rounded hover:bg-blue-500 active:bg-blue-600 ">
            Sign Up
          </button>
        </div>
        <p className=' text-center mt-3'>Have an account <span className='text-blue-500 cursor-pointer' onClick={() => navigate('/login')}>Login</span></p>
      </form>
    </div>
  </div>
  
  )
}

export default Signup
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userSlice'
function useAuth() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signOut = () => {
        fetch('/logout', {
            method: 'DELETE',
        })
        .then((resp) => {
            if(resp.ok) {
                dispatch(setUser(null))
                navigate('/')
            }
        })
    }

    const checkUser = () => {
        fetch('/me')
        .then(resp => {
            if(resp.ok){
                resp.json().then(data => dispatch(setUser(data)) )
            }else{
                console.log("Sign in")
            }
        })
    }

    const login = (e, credentials) => {
        e.preventDefault()

        fetch('/login', {
            method: 'POST',
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(credentials)
          })
          .then(resp => resp.json())
          .then(user => dispatch(setUser(user)))
          .then(navigate('/profile'))
          .catch(error => console.log(error))
        //   .then(resp => {
        //     if (resp.ok){
        //       resp.json().then(user => dispatch(setUser(user)))
        //     } else {
        //       console.log("didnt work")
        //     }
        //   })
        //   .then( navigate('/profile'))
    }



  return {signOut, checkUser, login } 
}

export default useAuth
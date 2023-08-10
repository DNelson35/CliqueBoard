import { useEffect } from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import Nav from "../components/Nav";
import AuthForm from "./Auth"

function App() {
  const location = useLocation()

  useEffect(() => {
    fetch('/me')
    .then(resp => {
      if(resp.ok){
        resp.json().then(data => console.log(data))
      }else{
        console.log("Sign in")
      }
    })
  },[])

  return (
    <div >
      {location.pathname !== '/auth' && <Nav/>}
      <Routes>
        <Route path={'/auth'} element={<AuthForm />} />
      </Routes>
    </div>
  );
}

export default App;

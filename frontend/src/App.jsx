import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {BrowserRouter , Routes , Route} from "react-router-dom"
import Home from './components/Home'
import Register from './components/Register'
import LogIn from './components/LogIn'

function App() {
  const [isUserLogggedIn , setIsUserLoggedIn] = useState(false);


  useEffect( ()=>{

    const fetchData = async()=>{
      try{
        const token = localStorage.getItem('token');
        if(token){
          console.log("Found Token Atleast");
        const res = await fetch("http://localhost:3000/verify?auth="+token);
        console.log("server Call made");
        // console.log(await res.json());
        const ans = await res.json();
        if(ans.flag) {
          setIsUserLoggedIn(true);
        } 
        else 
        {
          // alert("Token Expired")
          console.log("Token Expired")
        }
      }
        else {
          // alert("Token Not Found")
          console.log("Token Not Found");
        }
      }
      catch(error)
      {
        // alert(error.message)
        console.log("error = ",error.message);
      }
    }


    fetchData();
    
  },[]);







  return (
    <div>

      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isUserLogggedIn?<Home/>:<Register/>}/>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/LogIn' element={<LogIn/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

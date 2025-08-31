import React,{useContext, useEffect} from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Home from './pages/Home'
import {Toaster} from "react-hot-toast"
import { AuthDataContext } from './context/AuthContext'
const App = () => {
     const {authUser} = useContext(AuthDataContext)
     useEffect(() => {
        // console.log("authUser is", authUser)
     }, [authUser])
     
  return (
    <div className="bg-[url('/bgImage.svg')] bg-contain" >
      <Toaster />
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to='/' /> } />
        <Route path='/profile' element={authUser ? <Profile /> : <Navigate to='/login' />} />
      </Routes>
    </div>
  )
}

export default App
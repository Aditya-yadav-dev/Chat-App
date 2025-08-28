import React, { useState, useContext } from 'react'
import assets from '../assets/assets'
import { AuthDataContext } from '../context/AuthContext'

const Login = () => {
  const [currState, setcurrState] = useState("Sign Up")
  const [fullName, setfullName] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [bio, setbio] = useState("")
  const [isDataSubmitted, setisDataSubmitted] = useState(false)

  const {login} = useContext(AuthDataContext)

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState === 'Sign Up' && !isDataSubmitted) {
      setisDataSubmitted(true)
      return;
    }

    login(currState === "Sign Up" ? 'signup' : 'login', {fullname: fullName, email, password, bio})

  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

      {/* ---------------left--------------- */}

      <img src={assets.logo_big} alt="Massegeicon" className='w-[min(30vw,250px)]' />

      {/* -----------------right--------------- */}

      <form onSubmit={onSubmitHandler} className='border-2 bg-white/10 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h1 className='flex items-center w-full justify-between'>
          {currState}
          {isDataSubmitted && <img onClick={() => { setisDataSubmitted(false) }} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer ' />}
        </h1>

        {currState === "Sign Up" && !isDataSubmitted && (
          <input onChange={(e) => { setfullName(e.target.value) }} value={fullName} type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' required />
        )
        }

        {
          !isDataSubmitted && (
            <>
              <input onChange={(e) => { setemail(e.target.value) }} value={email} type="email" placeholder='Email Address' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus: ring-indigo-500' />
              <input onChange={(e) => { setpassword(e.target.value) }} value={password} type="password" placeholder='Password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus: ring-indigo-500' />
            </>
          )
        }


        {
          currState === "Sign Up" && isDataSubmitted && (
            <textarea rows={4} onChange={(e) => { setbio(e.target.value) }} value={bio} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='provide a short bio...' required ></textarea>
          )
        }

        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400
         to-violet-600 text-white rounded-md cursor-pointer'>
          {currState === 'Sign Up' ? "Create Account" : "Login Now"}
        </button>

        <div className='flex gap-2 text-sm text-teal-400'>
          <input type="checkbox" />
          <p>Agree to the term of use and privacy.</p>
        </div>

        <div className='flex flex-col gap-2'>
          {
            currState === 'Sign Up' ? (
              <p className='text-sm text-gray-600'>Already have an Account? <span onClick={() => { setcurrState("Login"); setisDataSubmitted(false) }} className='font-medium text-violet-500 cursor-pointer'>
                Login here
              </span></p>

            ) : (
              <p className='text-sm text-gray-600'>Create an Account? <span className='font-medium text-violet-500 cursor-pointer' onClick={() => { setcurrState("Sign Up"); }} >Click here</span> </p>
            )

          }

        </div>

      </form>

    </div>
  )
}

export default Login
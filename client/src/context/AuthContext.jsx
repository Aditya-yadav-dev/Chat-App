import React,{useContext, useState, useEffect} from 'react'
import { Children } from 'react'
import { createContext } from 'react'
import toast from 'react-hot-toast'
import {io} from "socket.io-client"
import axios from 'axios'

export const AuthDataContext = createContext()
const backendurl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendurl;

const AuthContext = ({children}) => {
    
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [authUser, setAuthUser] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [socket, setSocket] = useState(null)
        
    const checkAuth = async () => {
        try {
            const {data} = await axios.get("/api/auth/check")
            // console.log(data)
            if(data.success){
                setAuthUser(data.user)
                connectSocket(data.user)
            }
        } catch (error) {
        toast.error(error.message)
        }
    }

    //Login function to handle user authentication and socket connection
    const login = async (state, credentials) => {
        try {
            const {data} = await axios.post(`/api/auth/${state}`, credentials);
            // console.log(data)

            if(data.success){
                setAuthUser(data.userData);
                connectSocket(data.userData)
                axios.defaults.headers.common["token"] = data.token;
                setToken(data.token);
                localStorage.setItem("token", data.token)
                toast.success(data.message)
            } else{
            toast.error(error.message)
            }
            
        } catch (error) {
            // console.log(error.message)
            toast.error(error.message)
        }
    }

    const logout = async () => {
        localStorage.removeItem('token')
        setToken(null)
        setAuthUser(null)
        setOnlineUsers([])
        axios.defaults.headers.common["token"] = null;
        toast.success("logged out succesfully")
        socket.disconnect()
    }

    // update profile function to handle profile update

    const updateProfile = async (body) => {
        try {
            const {data} = await axios.put("/api/auth/update-profile", body);
            if(data.success){
                setAuthUser(data.user)
                toast.success("Profile Updated succesfully")
            }
        } catch (error) {
            toast.error(error.message)            
        }
    }

    // connect socket function to handle socket connection users updates
    const connectSocket = (userData)=>{
        if(!userData || socket?.connected) return;
        const newSocket = io(backendurl, {
            query: {
                userId: userData._id
            }
        })
        // console.log("the new socket is", newSocket);
        setSocket(newSocket);

    newSocket.on("getOnlineUsers", (users) => {
     setOnlineUsers(users);
    // console.log("online userr", users)
});

    }
    
    useEffect(() => {
        // console.log("token is",token)
        if(token){
            axios.defaults.headers.common["token"] = token;
        }
        checkAuth()
    }, [])
    
    let value = {
         axios,
         authUser,
         onlineUsers,
         socket,
         login,
         logout,
         updateProfile
        }

  return (
    <AuthDataContext.Provider value={value}>
        {children}
    </AuthDataContext.Provider>
  )
}

export default AuthContext
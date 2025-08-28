import React,{useState, useContext} from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { chatDataContext } from '../context/ChatContext'

const Home = () => {

    const {selectedUser} = useContext(chatDataContext)

  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%] backdrop-blur-sm'>
        <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 relative ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`}>
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
        </div>
    </div>
  )
}

export default Home
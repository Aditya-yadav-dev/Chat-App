import React, {useState, useContext, useEffect} from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { chatDataContext } from '../context/ChatContext'
import { AuthDataContext } from '../context/AuthContext'

const RightSidebar = () => {

   const {selectedUser, messages} = useContext(chatDataContext)
   const {logout, onlineUsers} = useContext(AuthDataContext)
   const [msgImages, setmsgImages] = useState([])

    useEffect(() => {
      setmsgImages(
        messages.filter(msg => msg.image).map(msg =>msg.image)
      )
    }, [messages])
     

  return selectedUser && (
    <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${selectedUser ? 'max-md:hidden' : ''}`}>
      <div className='pt-6 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
        <img src={selectedUser?.profilePic || assets.arrow_icon} className='w-20 aspect-[1/1] rounded-full' alt="profileImage" />
        <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
        { onlineUsers.includes(selectedUser._id) &&  <p className='w-2 h-2 mx-auto bg-red-500 rounded-full'></p>}
          {selectedUser.fullName}
        </h1>
        <p className='mx-auto'>{selectedUser.bio}</p>
      </div>
      <hr className='border border-[#ffffff50] my-4' />
      <div className='px-5 text-xs'>
        <p className='text-xl'>Media</p>
        <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
          {msgImages.map((url,index)=>(
              <div key={index} onClick={() => { window.open(url) }} className='cursor-pointer rounded p-1'>
                <img src={url} className='h-full rounded-md' />
              </div>
          ))}
        </div>
      </div>
      <button onClick={logout} className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default RightSidebar
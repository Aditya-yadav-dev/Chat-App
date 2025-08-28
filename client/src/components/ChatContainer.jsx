import React, { isValidElement, useRef, useEffect, useContext, useState } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { chatDataContext } from '../context/ChatContext'
import { AuthDataContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

const ChatContainer = () => {

  const { selectedUser, setselectedUser, messages, sendMessage, getMessages } = useContext(chatDataContext)
  const { authUser, onlineUsers } = useContext(AuthDataContext)

  const scrollEnd = useRef()

  const [input, setInput] = useState("")

  // handle sending a message
  const handleSendMessage = async (e) => {
     e.preventDefault();
    //  console.log("handlesendmessage inp",input)
     if(input.trim() === "") return null;
     await sendMessage({text: input.trim()})
     setInput("")
  }

  // handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    // console.log('image in file format is',file)
    if(!file || !file.type.startsWith('image/')){
      toast.error("select an image file")
      return;
    }
    const reader = new FileReader()
    
    // console.log('image in file format is',reader)

    reader.onloadend = async () => {
      await sendMessage({image: reader.result});
      e.target.value = "";
    }
    reader.readAsDataURL(file)
    // console.log("read as data url", reader.readAsDataURL(file))
  } 

  useEffect(() => {
    if(selectedUser){
    getMessages(selectedUser._id)
    }
  }, [selectedUser])
  

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])


  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/*------------- header------------- */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={ selectedUser.profilePic || assets.avatar_icon } alt="profie" className='w-8 rounded-full' />
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
           {selectedUser.fullname}
        { onlineUsers.includes(selectedUser._id) && <span className='w-2 h-2 rounded-full bg-green-50'></span>}
        </p>
        <img onClick={() => { setselectedUser(null) }} src={assets.arrow_icon} alt="arrow" className='md:hidden max-w-7' />
        <img src={assets.help_icon} alt="help" className='max-md:hidden max-w-5' />
      </div>
      {/* ---------------Chat Area---------------- */}
      <div className='flex flex-col h-[calc(100%-126px)] overflow-y-scroll p-3'>
        {messages.map((msg, index) => (
          <div className={`flex items-center gap-2 justify-end ${msg.senderId !== authUser._id && 'flex-row-reverse'}`} key={index}>
            {
              msg.image ? (
                <img src={msg.image} className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
              ) : (
                <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId === authUser._id ? 'rounded-br-none' : 'rounded-bl-none'}`}>{msg.text}</p>
              )}
            <div className='text-center text-xs'>
              <img src={msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon} className='w-7 rounded-full'/>
              <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div className='h-0' ref={scrollEnd}>
        </div>

        {/* --------------bottom Area-------------- */}

        <div className='absolute bottom-0 right-0 left-0 flex items-center gap-3 p-3'>
          <div className='flex flex-1 justify-between h-12 border border-gray-500 rounded-full items-center px-6'>
              <input type="text" onChange={(e) => { setInput(e.target.value) }} value={input} onKeyDown={(e) => { e.key === "Enter" ? handleSendMessage(e) : null }}  placeholder='Send a message' className='text-teal-50 placeholder:text-gray-400 placeholder:text-sm h-full flex-1 outline-none border-none text-sm' />
              <input type="file" name="" id="image" onChange={handleSendImage} accept='image/png, image/jpeg' hidden  />
              <label htmlFor="image">
                <img src={assets.gallery_icon} alt="" className='w-5 mr-2 cursor-pointer' />
              </label>
          </div>
          <img src={assets.send_button} alt="" onClick={handleSendMessage} className='w-10 cursor-pointer' />
        </div>

      </div>
    </div>
  ) : (
    <div className='flex flex-col h-full items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <img src={assets.logo_icon} className='max-w-16' />
      <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
    </div>
  )

}

export default ChatContainer
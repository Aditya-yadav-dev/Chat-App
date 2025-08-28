import React,{useState, useEffect, useContext} from 'react'
import { createContext } from 'react'
import { AuthDataContext } from './AuthContext'
import toast from 'react-hot-toast'

export const chatDataContext = createContext()

const ChatContext = ({children}) => {
    const [messages, setMessages] = useState([]) 
    const [users, setUsers] = useState([])
    const [selectedUser, setselectedUser] = useState(null)
    const [unseenMessages, setunseenMessages] = useState({})

    const {socket, axios} = useContext(AuthDataContext)
    // function to get call for all user sidebar
    const getUsers = async () => {
        try {
            const {data} = await axios.get("/api/messages/users");
            if(data.success){
                setUsers(data.users)
                setunseenMessages(data.unseenMessages)
            }
        } catch (error) {
          toast.error(error.message)
        }
    }

    // functionto get messages for the selected user
    const getMessages = async (userId) => {
        try {
            const {data} = await axios.get(`/api/messages/${userId}`)
            if(data.success){
                setMessages(data.messages)
            }
        } catch (error) {
          toast.error(error.message)
        }
    }
    
    // function to send message to selected user
    const sendMessage = async (messageData) => {
        try {
            // console.log("message data", messageData)
            const {data} = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData)
            // console.log("send msg data",data)
            if(data.success){
                setMessages((prevMessages)=>[...prevMessages, data.newMessage])
            } else{
                toast.error(data.message)
            }
        } catch (error) {
                toast.error(data.message)
        }
    }

    // function to subscribe to messages for selected user
    const subscribeToMessages = async () => {
        if(!socket) return;

        socket.on("newMessage", (newMessage)=>{
            // console.log('newmessage through socket is', newMessage)
            
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen = true;
                setMessages((prevMessages)=>[...prevMessages, newMessage])
                axios.put(`/api/messages/mark/${newMessage._id}`)
            } else {
                setunseenMessages((prevUnseenMessages)=> ({
                    ...prevUnseenMessages, [newMessage.senderId] : 
                    prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1
                }))
            }
        })
        
    }

    //function to unsubscribe from the messages
    const unsubscribeFromMessage = async () => {
          if(socket) socket.off("newMassage")
    }

    useEffect(() => {
      subscribeToMessages();
    
      return () => {
        unsubscribeFromMessage()
      }
    }, [socket, selectedUser])
    

    const value = {
       messages, users, selectedUser, getUsers, setMessages, sendMessage, setselectedUser, unseenMessages, setunseenMessages, getMessages
    }

  return (
    <chatDataContext.Provider value={value}>
        {children}
    </chatDataContext.Provider>
  )
}

export default ChatContext
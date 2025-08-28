import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/AuthContext.jsx'
import ChatContext from './context/ChatContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthContext>
    <ChatContext>
    <App />
    </ChatContext>
  </AuthContext>
  </BrowserRouter>,
)

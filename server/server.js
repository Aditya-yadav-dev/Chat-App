import express from 'express';
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import {Server} from 'socket.io';

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
    cors: {origin: "*"}
})

// to store online users
export const userSocketMap = {};

//socket.io connection handler
io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("user connected",userId);

    // console.log("user socket id is",socket.id);

    if(userId) userSocketMap[userId] = socket.id; 

    //emit online users to all connected clients  
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", ()=>{
        // console.log("User disconnected",userId);
        delete userSocketMap[userId]; 
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})

//app.use(cors());
app.use(cors({
  origin: "*",           // any frontend can access
  methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
  credentials: true     // cookies/authorization headers allowed
}));

// Middleware setup
app.use(express.json({limit: "4mb"}));


app.use('/api/auth',userRouter)
app.use('/api/messages',messageRouter)

app.use("/api/status",(req,res)=>{
    res.send('server is live')
})

await connectDB()

const port = process.env.PORT || 5000;

if(process.env.NODE_ENV !== "production"){
server.listen(process.env.PORT, ()=>{ 
    // console.log(`Server is running on ${port}`); 
    console.log(`Port is`,process.env.PORT);  
})
}


export default server;
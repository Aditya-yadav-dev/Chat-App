import mongoose from 'mongoose';

export const connectDB = async() =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/Chat_App`)
        .then(()=>console.log("database connected succesfully"))

        // mongoose.connetion.on('connected',()=>{
        //     console.log('Database connected successfully');
        // })

    } catch (error) {  
        console.log('Database connection failed');
    }
}
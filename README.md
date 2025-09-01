
A real-time chat application built with the MERN stack, Socket.IO, and Cloudinary for media storage.
This app allows users to register, log in, chat in real-time,show Online Users and share images, providing a smooth, modern messaging experience.


---

🔗 Demo

🚀 Live Demo: https://chat-app-client-nu-six.vercel.app/



---

🚀 Features

🔑 User Authentication (JWT + bcrypt)

👤 User Profiles (with avatars via Cloudinary)

💬 Real-Time Messaging (Socket.IO)

📷 Image Uploads (Cloudinary integration)

👥 One-to-One 

🟢 Online/Offline Status

🗑️ Message Deletion

📱 Responsive UI (React + Tailwind CSS )



---

🛠️ Tech Stack

Frontend:

React.js (Vite )

Context API 

Axios

Tailwind CSS 


Backend:

Node.js + Express.js

MongoDB + Mongoose

JWT for Authentication

Socket.IO

Cloudinary



---

⚙️ Installation

1️⃣ Clone the repository

git clone https://github.com/aditya-yadav-dev/Chat-App.git
cd Chat-App

2️⃣ Setup Backend

cd server
npm install

Create a .env file inside backend with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Run backend:

npm run server

3️⃣ Setup Frontend

cd client
npm install

Create a .env file inside frontend with:

VITE_BACKEND_URL=http://localhost:5000

Run frontend:

npm run dev


---

📸 Screenshots

### Sign Up 🔐
  ![Sign Up](<Screenshot 2025-08-28 210051.png>)
### Login 🔐
![Login](<Screenshot 2025-08-28 210140.png>)

### Home Page
![Home Page](<Screenshot 2025-08-28 210855.png>)

### Edit Profile  
![Edit Profile](<Screenshot 2025-08-28 211101.png>)

### Chat Window 💬
![Chat container](<Screenshot 2025-08-28 211215.png>)
![Chat ccontainer](<Screenshot 2025-08-28 211334.png>)


---

📂 Project Structure

Chat-App/
│── server/         # Express server + 
│   ├── config/      # DB & cloudinary 
│   ├── controllers/ # API logic
│   ├── models/      # Mongoose schemas
│   ├── routes/      # Express routes
│   └── server.js    # Entry point
│
│── client/        # React app
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.jsx
│
└── README.md


---





---

🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.


---

📜 License

This project is licensed under the MIT License.


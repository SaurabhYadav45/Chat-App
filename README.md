# Quick Chat

Quick Chat is a real-time chat application built using the MERN (MongoDB, Express, React, Node.js) stack. It supports instant messaging, file sharing, and emoji support, making communication seamless and efficient.                                                                                                                   Deployment Link : https://quick-chat-app-tx3m.onrender.com   

## Features
- **Real-time messaging** using Socket.io
- **User authentication** (JWT-based login/signup)
- **Send and receive images, videos, and emojis**
- **Profile management** (update profile picture and user details)
- **Multer & Cloudinary integration** for media uploads
- **Responsive UI** for a smooth experience on all devices
## Screenshots

![Screenshot 2025-02-27 164938](https://github.com/user-attachments/assets/842d10de-f157-4ec9-a9fa-674f71afce0a)

![Screenshot 2025-02-27 165016](https://github.com/user-attachments/assets/20077274-3114-4168-b862-3837ba6c7bd3)

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Real-time communication:** Socket.io
- **Authentication:** JWT, bcrypt.js
- **File Uploads:** Multer, Cloudinary

## Installation

### Prerequisites
- Node.js & npm installed
- MongoDB instance running (local or cloud-based)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/quick-chat.git
   cd quick-chat
   ```
2. Install dependencies:
   ```sh
   cd server
   npm install
   cd ../client
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the `server` folder and add:
     ```env
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_secret_key
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     ```
4. Start the backend server:
   ```sh
   cd server
   npm start
   ```
5. Start the frontend:
   ```sh
   cd client
   npm start
   ```

## Deployment
- The app can be deployed on **Render, Vercel, or Netlify**
- Configure environment variables accordingly

## Future Enhancements
- Implement group chats
- Add voice/video calling features
- Improve UI with additional themes

## Contributing
Feel free to fork this repository and submit pull requests.

---
Developed with ❤️ by Saurabh Yadav




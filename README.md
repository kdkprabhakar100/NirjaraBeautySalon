# Nirjara Beauty Salon

Nirjara Beauty Salon is a full-stack beauty salon and academy website built with React, Node.js, Express, MongoDB, and Cloudinary. The website allows users to view services, gallery images, branches, academy courses, blogs, and send contact messages. It also includes an admin dashboard to manage bookings, services, courses, gallery, blogs, and messages.

## Live Links

Frontend: https://nirjarabeautysalon.vercel.app  
Backend: https://nirjarabeautysalon.onrender.com

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- Vercel

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Cloudinary
- Multer
- Render

## Features

- Public website pages
  - Home
  - Services
  - Gallery
  - Branches
  - Academy
  - Blog
  - Contact
  - Booking

- Admin dashboard
  - Admin login
  - Manage services
  - Manage gallery images
  - Manage academy courses
  - Manage blogs
  - View bookings
  - View contact messages

- Image upload
  - Admin uploads image from local device
  - Backend uploads image to Cloudinary
  - Cloudinary URL is saved in MongoDB
  - Frontend displays image using the stored URL

## Project Structure

```txt
NirjaraBeautySalon/
│
├── nirjara-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
│
└── nirjara-backend/
    ├── routes/
    ├── models/
    ├── middleware/
    ├── config/
    ├── server.js
    └── package.json

    # developed by kdkprabhakar
    # lets develop mart now
    # next features i will create website popup
    # nirjara salon

    Website Popup Feature

The Website Popup Feature allows admins to create promotional popups, announcements, offers, and campaigns directly from the admin panel. These popups automatically appear on the website based on start/end dates and active status.

Features
Admin popup management panel
Create popup offers dynamically
Upload popup images from device
Cloudinary image upload support
Popup activation/deactivation
Start date & end date support
Auto popup display on website
Delay timing control
Delete popup functionality
Fully responsive UI
Toast notifications
MongoDB storage
Technologies Used
Frontend
React
TypeScript
Tailwind CSS
React Toastify
Backend
Node.js
Express.js
MongoDB
Mongoose
Cloudinary

backend/
│
├── controllers/
│   ├── eventController.js
│   └── eventRegistrationController.js
│
├── models/
│   ├── Event.js
│   └── EventRegistration.js
│
├── routes/
│   ├── eventRoutes.js
│   └── eventRegistrationRoutes.js
│
└── server.js


frontend/
│
├── src/
│   ├── pages/
│   │   ├── public/
│   │   │   ├── Events.tsx
│   │   │   └── EventDetails.tsx
│   │   │
│   │   └── admin/
│   │       └── AdminEvents.tsx
│   │
│   └── App.tsx
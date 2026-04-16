# 🏔️ Natours - Adventure Travel Platform

## A Modern Full-Stack Tour Booking Application

## ✨ Live Demo

[![Live Demo](https://img.shields.io/badge/Live%20Demo-natours.nexotechit.com-22c55e?style=for-the-badge&logo=vercel&logoColor=white)](https://natours.nexotechit.com)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Natours** is a production-ready, full-stack adventure travel platform that allows users to discover, review, and book amazing tours worldwide. Built with modern web technologies, it features a robust backend API, seamless Stripe payment integration, and a beautiful responsive frontend with dark mode support.

### 🚀 Key Highlights

- ✅ **Complete Booking System** - Stripe payment integration with webhook handling
- ✅ **User Management** - JWT authentication, role-based access (Admin/Guide/User)
- ✅ **Interactive Maps** - Leaflet integration with tour routes and location markers
- ✅ **Review System** - Full CRUD operations with rating aggregation
- ✅ **Admin Dashboard** - Complete tour, user, booking, and review management
- ✅ **Dark Mode** - Theme persistence with system preference detection
- ✅ **Responsive Design** - Mobile-first approach using Tailwind CSS

---

## 🌟 Features

### 👤 User Features

| Feature                | Description                                    |
| ---------------------- | ---------------------------------------------- |
| **Authentication**     | Signup, Login, Forgot/Reset Password           |
| **Profile Management** | Update profile, upload avatar, change password |
| **Tour Browsing**      | Search, filter, sort, and pagination           |
| **Tour Details**       | Interactive map, itinerary, gallery, guides    |
| **Reviews**            | Write, edit, delete reviews with star ratings  |
| **Booking**            | Secure Stripe payment integration              |
| **My Bookings**        | View all booked tours and payment history      |
| **Dark Mode**          | Toggle between light/dark/system themes        |

### 👑 Admin Features

| Feature               | Description                                      |
| --------------------- | ------------------------------------------------ |
| **Dashboard**         | Overview stats (tours, users, bookings, revenue) |
| **Tour Management**   | Create, edit, delete tours with image upload     |
| **User Management**   | Change user roles, delete users                  |
| **Booking Overview**  | View all platform bookings                       |
| **Review Moderation** | Delete inappropriate reviews                     |

---

## 🛠️ Tech Stack

### Frontend

```json
{
  "framework": "React 18 + TypeScript",
  "buildTool": "Vite",
  "styling": "Tailwind CSS + shadcn/ui",
  "stateManagement": "TanStack React Query + Context API",
  "forms": "React Hook Form + Zod",
  "maps": "Leaflet + React-Leaflet",
  "payments": "Stripe",
  "routing": "React Router v6"
}
```

### Backend

```json
{
  "runtime": "Node.js",
  "framework": "Express.js",
  "database": "MongoDB + Mongoose",
  "authentication": "JWT (HttpOnly Cookies)",
  "fileUpload": "Multer + Cloudinary",
  "payments": "Stripe",
  "email": "Nodemailer"
}
```

### DevOps & Tools

- **Version Control**: Git
- **Package Manager**: pnpm
- **Code Quality**: ESLint + Prettier
- **API Testing**: Postman + Stripe CLI

---

</details>

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- pnpm (recommended) or npm
- Stripe Account (for payments)
- Cloudinary Account (for image upload)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/layekmia/natours-fullstack-travel-app.git
cd natours
```

#### 2. Install Backend Dependencies

```bash
cd backend
pnpm install
```

#### 3. Install Frontend Dependencies

```bash
cd frontend
pnpm install
```

#### 4. Set up Environment Variables

Create `.env` files in both backend and frontend directories (see [Environment Variables](#environment-variables)).

#### 5. Run Development Servers

**Backend:**

```bash
cd backend
pnpm run dev
```

**Frontend:**

```bash
cd frontend
pnpm run dev
```

#### 6. Access the Application

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE=mongodb://localhost:27017/natours

# JWT
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Email
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USERNAME=your-username
EMAIL_PASSWORD=your-password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Frontend URL
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx
```

---

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint                             | Description            |
| ------ | ------------------------------------ | ---------------------- |
| POST   | `/api/v1/users/signup`               | Register new user      |
| POST   | `/api/v1/users/login`                | Login user             |
| POST   | `/api/v1/users/forgotPassword`       | Send reset token       |
| PATCH  | `/api/v1/users/resetPassword/:token` | Reset password         |
| PATCH  | `/api/v1/users/updatePassword`       | Update password (auth) |

### Tour Endpoints

| Method | Endpoint            | Description                  |
| ------ | ------------------- | ---------------------------- |
| GET    | `/api/v1/tours`     | Get all tours (with filters) |
| GET    | `/api/v1/tours/:id` | Get single tour              |
| POST   | `/api/v1/tours`     | Create tour (admin)          |
| PATCH  | `/api/v1/tours/:id` | Update tour (admin)          |
| DELETE | `/api/v1/tours/:id` | Delete tour (admin)          |

### Review Endpoints

| Method | Endpoint                        | Description                 |
| ------ | ------------------------------- | --------------------------- |
| GET    | `/api/v1/tours/:tourId/reviews` | Get tour reviews            |
| POST   | `/api/v1/tours/:tourId/reviews` | Create review (auth)        |
| PATCH  | `/api/v1/reviews/:id`           | Update review (owner)       |
| DELETE | `/api/v1/reviews/:id`           | Delete review (owner/admin) |

### Booking Endpoints

| Method | Endpoint                                    | Description           |
| ------ | ------------------------------------------- | --------------------- |
| GET    | `/api/v1/bookings/checkout-session/:tourId` | Create Stripe session |
| GET    | `/api/v1/bookings/my-bookings`              | Get user bookings     |
| POST   | `/api/v1/bookings/webhook`                  | Stripe webhook        |

---

## 📁 Project Structure

```
natours/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── api/           # API service layer
    │   ├── components/    # Reusable UI components
    │   ├── context/       # React Context providers
    │   ├── hooks/         # Custom React hooks
    │   ├── lib/           # Utilities & config
    │   ├── pages/         # Page components
    │   ├── routes/        # Route configuration
    │   ├── schemas/       # Zod validation schemas
    │   ├── types/         # TypeScript definitions
    │   └── App.tsx
    ├── index.html
    ├── package.json
    └── vite.config.ts
```

---

## 🚢 Deployment

### Backend Deployment (Render/Railway)

1. Push code to GitHub
2. Connect repository to Render/Railway
3. Add environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)

```bash
# Build the project
cd frontend
pnpm run build

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

**Layek Miah**

- Portfolio: [layekmiah.nexotechit.com](https://layekmiah.nexotechit.com/)
- GitHub: [@layekmia](https://github.com/layekmia)
- LinkedIn: [layekmiah-webdeveloper](https://www.linkedin.com/in/layekmiah-webdeveloper/)

---

## 🙏 Acknowledgments

- [Jonas Schmedtmann](https://github.com/jonasschmedtmann) - Original Natours backend inspiration
- [shadcn/ui](https://ui.shadcn.com) - Beautiful UI components
- [Unsplash](https://unsplash.com) - Stunning images
- [Stripe](https://stripe.com) - Payment infrastructure
- [Cloudinary](https://cloudinary.com) - Image hosting

---

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

---

**Built with ❤️ using React, Node.js, and MongoDB**

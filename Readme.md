# 🏡 RentNest Backend

A secure and scalable backend API for a property rental platform where landlords can list properties, tenants can rent them securely using Stripe Checkout, and administrators can manage the entire system.

## 🌐 Live API

**Base URL:**  
https://rentnest-coral.vercel.app

---

# 🚀 Features

## 🔐 Authentication & Authorization

- User Registration
- Secure Login with JWT Authentication
- Role-Based Access Control
- Protected Routes
- User Profile Retrieval

### Supported Roles

- 👨‍💼 Admin
- 🏠 Landlord
- 🧑‍💼 Tenant

---

## 🏠 Property Management

Landlords can:

- Create Properties
- Update Their Own Properties
- Delete Their Own Properties
- View Their Property Listings

Public users can:

- Browse Properties
- Search by Location
- Filter by:
  - Property Type
  - Price Range
  - Amenities

---

## 📋 Rental Request System

Tenants can:

- Send Rental Requests
- View Rental Requests
- Complete Active Rentals

Landlords can:

- View Incoming Requests
- Approve Requests
- Reject Requests

Rental Lifecycle:

```
PENDING
   ↓
APPROVED
   ↓
ACTIVE
   ↓
COMPLETED
```

---

## 💳 Stripe Payment Integration

- Stripe Checkout Session
- Secure Payment Processing
- Stripe Webhook Verification
- Automatic Payment Status Updates
- Rental Activation After Successful Payment
- Property Availability Management

---

## ⭐ Review System

Tenants can:

- Review properties only after completing a rental
- Submit only one review per property

---

## 💰 Payment History

Tenants can:

- View their payment history
- View individual payment details

Admins can:

- View all payment records

---

## 👤 Tenant Profile

Tenants can:

- Update Profile Information
- Change Name
- Change Email

Email uniqueness is validated before updating.

---

## 🛠 Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Stripe API
- bcrypt
- Cookie Parser
- CORS

---

# 📂 Project Structure

```
src
│
├── config
├── middleware
├── modules
│   ├── admin
│   ├── auth
│   ├── landlord
│   ├── payment
│   ├── property
│   ├── rental-requests
│   ├── reviews
│   └── tenant
│
├── utils
├── lib
├── app.ts
└── server.ts
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Create a `.env` file and configure your environment variables.

Run the development server

```bash
npm run dev
```

Build the project

```bash
npm run build
```

Start the production server

```bash
npm start
```

---

# 📚 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |
| GET | `/api/auth/me` | Get Logged-in User |

---

## Properties

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/properties` | Get All Properties |
| GET | `/api/properties/:id` | Get Single Property |

---

## Landlord

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/landlord/properties` | Create Property |
| PATCH | `/api/landlord/properties/:id` | Update Property |
| DELETE | `/api/landlord/properties/:id` | Delete Property |
| GET | `/api/landlord/properties` | Get My Properties |
| PATCH | `/api/landlord/rental-requests/:id` | Approve/Reject Rental Request |

---

## Rental Requests

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/rentals` | Create Rental Request |
| GET | `/api/rentals` | Get Rental Requests |
| PATCH | `/api/rentals/:id/complete` | Complete Rental |

---

## Payments

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/payments/create` | Create Stripe Checkout Session |
| POST | `/api/payments/confirm/webhook` | Stripe Webhook |
| GET | `/api/payments` | Payment History |
| GET | `/api/payments/:id` | Payment Details |

---

## Reviews

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/reviews` | Submit Review |

---

## Tenant

| Method | Endpoint | Description |
|---------|----------|-------------|
| PATCH | `/api/tenants/profile` | Update Tenant Profile |

---

## Admin

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/admin/users` | Get All Users |
| PATCH | `/api/admin/users/:id` | Ban or Unban User |

---

# 🔒 Authorization

Most endpoints require authentication using a JWT access token.

Example:

```
Authorization: Bearer <your_access_token>
```

---

# 🔄 Rental Workflow

```text
Tenant
   │
   ▼
Browse Properties
   │
   ▼
Send Rental Request
   │
   ▼
Landlord Approves
   │
   ▼
Stripe Checkout
   │
   ▼
Webhook Confirms Payment
   │
   ▼
Rental Becomes ACTIVE
   │
   ▼
Tenant Completes Rental
   │
   ▼
Tenant Can Submit Review
```

---

# 📌 Future Improvements

- Property Image Upload
- Property Wishlist
- Email Notifications
- Advanced Search & Sorting
- Dashboard Analytics
- Multi-image Support
- Pagination
- Rate Limiting
- Refresh Token Authentication
- Unit & Integration Testing

---

# 👨‍💻 Author

**Tamim Khan**

Backend Developer

Built with ❤️ using Node.js, Express, Prisma, PostgreSQL, and Stripe.
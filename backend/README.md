<div align="center">
  <br />

  <h1>💬 Messenger — Backend API</h1>

  <p>A secure, scalable real-time messaging backend with JWT auth, media uploads, email automation, and multi-layer security protection.</p>

  <br />

  ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
  ![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
  ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
  ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)
  ![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

  <br />
  <br />
</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🏗️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [⚙️ Environment Variables](#️-environment-variables)
- [🚀 Getting Started](#-getting-started)
- [🔐 Authentication System](#-authentication-system)
- [🛡️ Security — Arcjet](#️-security--arcjet)
- [🗄️ Database Models](#️-database-models)
- [🌐 API Reference](#-api-reference)
  - [Auth Routes](#-auth-routes----apiauth)
  - [Message Routes](#-message-routes----apimessages)
  - [Error Reference](#-error-reference)
- [📧 Email Workflow](#-email-workflow)
- [🖼️ Cloudinary Workflow](#️-cloudinary-workflow)
- [🔮 Roadmap](#-roadmap)

---

## ✨ Features

| | Feature | Details |
|---|---|---|
| 🔐 | **Authentication** | Signup · Login · Logout · JWT HttpOnly Cookies · Protected Routes |
| 💬 | **Messaging** | Send & receive messages · Text & image support · Full chat history |
| 🖼️ | **Media Uploads** | Profile pictures & message images via Cloudinary |
| 📧 | **Email** | Automated welcome email on signup via Resend |
| 🛡️ | **Security** | Arcjet rate limiting · Bot detection · Shield attack protection |
| 👥 | **Contacts** | Discover all users · List active chat partners |

---

## 🏗️ Tech Stack

| Technology | Role |
|---|---|
| **Node.js** | Server runtime |
| **Express.js** | REST API framework |
| **MongoDB** | Primary database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Stateless authentication |
| **Cookie Parser** | Cookie management |
| **Cloudinary** | Image storage & CDN |
| **Resend** | Transactional email |
| **Arcjet** | Security, rate limiting & bot protection |
| **bcryptjs** | Password hashing |

---

## 📂 Project Structure

```
backend/
│
├── controllers/                # Route handler logic
│   ├── auth.controller.js
│   └── message.controller.js
│
├── middlewares/                # Express middleware
│   ├── auth.middleware.js      # JWT verification
│   └── arcjet.middleware.js    # Security layer
│
├── models/                     # Mongoose schemas
│   ├── User.js
│   └── Message.js
│
├── routes/                     # API route definitions
│   ├── auth.route.js
│   └── message.route.js
│
├── emails/                     # Email logic & templates
│   ├── emailHandlers.js
│   └── emailTemplates.js
│
├── lib/                        # Third-party integrations
│   ├── arcjet.js
│   ├── cloudinary.js
│   ├── db.js
│   ├── resend.js
│   └── utils.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and fill in the values below:

```env
# ┌─────────────────────────────────────────┐
# │               Server                    │
# └─────────────────────────────────────────┘
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# ┌─────────────────────────────────────────┐
# │               Database                  │
# └─────────────────────────────────────────┘
MONGO_URI=

# ┌─────────────────────────────────────────┐
# │            Authentication               │
# └─────────────────────────────────────────┘
JWT_SECRET=

# ┌─────────────────────────────────────────┐
# │              Cloudinary                 │
# └─────────────────────────────────────────┘
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# ┌─────────────────────────────────────────┐
# │           Resend (Email)                │
# └─────────────────────────────────────────┘
RESEND_API_KEY=
EMAIL_FROM=
EMAIL_FROM_NAME=

# ┌─────────────────────────────────────────┐
# │           Arcjet (Security)             │
# └─────────────────────────────────────────┘
ARCJET_KEY=
```

---

## 🚀 Getting Started

**Step 1 — Clone the repository**

```bash
git clone <repository-url>
cd backend
```

**Step 2 — Install dependencies**

```bash
npm install
```

**Step 3 — Configure environment**

Create your `.env` file and fill in all required values (see section above).

**Step 4 — Start MongoDB**

Ensure MongoDB is running locally, or provide a MongoDB Atlas URI in `MONGO_URI`.

**Step 5 — Start the server**

```bash
# Development  (hot reload)
npm run dev

# Production
npm start
```

---

## 🔐 Authentication System

Authentication is handled with **JWT tokens stored in secure HttpOnly cookies**.

```
POST /signup  or  POST /login
            │
            ▼
    ┌───────────────────┐
    │  JWT Generated    │
    └────────┬──────────┘
             │
             ▼
    ┌───────────────────────────────────────────┐
    │  HttpOnly Cookie Set                      │
    │  Name     : jwtToken                      │
    │  Expires  : 7 Days                        │
    │  httpOnly : true  → blocks XSS            │
    │  sameSite : strict → blocks CSRF          │
    │  secure   : true  → HTTPS only (prod)     │
    └───────────────────────────────────────────┘
```

All protected routes verify the cookie via `auth.middleware.js` before granting access.

---

## 🛡️ Security — Arcjet

Every API route is wrapped with [Arcjet](https://arcjet.com) security — three layers applied automatically:

### 🔰 Shield Protection
Blocks common web attack patterns including SQL injection and malicious payloads.

### 🤖 Bot Detection

| ✅ Allowed | ❌ Blocked |
|---|---|
| Search engine crawlers | Automated scripts |
| Verified legitimate bots | Malicious bots |
| | Spoofed user-agents |

### ⏱️ Rate Limiting

```
Limit  : 100 requests
Window : 60 seconds
Scope  : Per IP address
```

> Violations return `429 Too Many Requests`.

---

## 🗄️ Database Models

### User

```js
{
  _id            : ObjectId,   // Auto-generated
  fullName       : String,     // Required
  email          : String,     // Required · Unique
  password       : String,     // bcrypt hashed
  profilePicture : String,     // Cloudinary URL
  createdAt      : Date,       // Auto-managed
  updatedAt      : Date        // Auto-managed
}
```

### Message

```js
{
  _id        : ObjectId,   // Auto-generated
  senderId   : ObjectId,   // ref → User
  receiverId : ObjectId,   // ref → User
  text       : String,     // Optional
  image      : String,     // Optional · Cloudinary URL
  createdAt  : Date,       // Auto-managed
  updatedAt  : Date        // Auto-managed
}
```

---

## 🌐 API Reference

```
Base URL : http://localhost:3000
```

> 🔒 Routes marked **Protected** require a valid `jwtToken` cookie.

---

### 🔑 Auth Routes — `/api/auth`

---

#### `POST /api/auth/signup`
> Create a new user account.

**Request Body**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Responses**

```
✅ 201 Created
```
```json
{
  "message": "User Created Successfully",
  "_id": "685c12345",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePicture": ""
}
```

```
❌ 400 Bad Request — Missing fields
```
```json
{ "message": "All fields are required" }
```

```
❌ 400 Bad Request — Password too short
```
```json
{ "message": "Password must be at least 6 characters" }
```

```
❌ 400 Bad Request — Invalid email
```
```json
{ "message": "Invalid email format" }
```

```
❌ 400 Bad Request — Email already registered
```
```json
{ "message": "User already exists" }
```

```
❌ 500 Internal Server Error
```
```json
{ "message": "Server Error" }
```

---

#### `POST /api/auth/login`
> Authenticate and receive a JWT cookie.

**Request Body**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Responses**

```
✅ 200 OK
```
```json
{
  "message": "Login successful",
  "_id": "685c12345",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePicture": ""
}
```

```
❌ 400 Bad Request — Missing fields
```
```json
{ "message": "All fields are required" }
```

```
❌ 400 Bad Request — Wrong credentials
```
```json
{ "message": "Invalid credentials" }
```

```
❌ 500 Internal Server Error
```
```json
{ "message": "Internal Server Error" }
```

---

#### `POST /api/auth/logout`
> Clear the JWT cookie and end the session.

**No request body required.**

**Responses**

```
✅ 200 OK
```
```json
{ "message": "Logout successful" }
```

---

#### `PUT /api/auth/update-profile` 🔒 Protected
> Upload or replace the authenticated user's profile picture.

**Headers**
```
Cookie: jwtToken=<token>
```

**Request Body**
```json
{
  "profilePicture": "<base64-encoded-image-string>"
}
```

**Responses**

```
✅ 200 OK
```
```json
{
  "message": "Profile picture updated successfully",
  "profilePicture": "https://res.cloudinary.com/..."
}
```

```
❌ 400 Bad Request — No image provided
```
```json
{ "message": "Profile picture is required" }
```

```
❌ 401 Unauthorized — No or invalid token
```
```json
{ "message": "Unauthorized - No token provided" }
```

```
❌ 500 Internal Server Error
```
```json
{ "message": "Internal Server Error" }
```

---

#### `GET /api/auth/check` 🔒 Protected
> Verify the current session and return the authenticated user's profile.

**Headers**
```
Cookie: jwtToken=<token>
```

**Responses**

```
✅ 200 OK
```
```json
{
  "_id": "685c12345",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePicture": ""
}
```

```
❌ 401 Unauthorized — No token
```
```json
{ "message": "Unauthorized - No token provided" }
```

```
❌ 401 Unauthorized — Invalid token
```
```json
{ "message": "Unauthorized - Invalid token" }
```

```
❌ 401 Unauthorized — User not found
```
```json
{ "message": "Unauthorized - User not found" }
```

---

### 💬 Message Routes — `/api/messages`

> 🔒 All routes below require a valid `jwtToken` cookie.

---

#### `GET /api/messages/contacts` 🔒 Protected
> Return every registered user (excluding the caller) for contact discovery.

**Headers**
```
Cookie: jwtToken=<token>
```

**Responses**

```
✅ 200 OK
```
```json
[
  {
    "_id": "685c123",
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "profilePicture": ""
  },
  {
    "_id": "685c456",
    "fullName": "Bob Smith",
    "email": "bob@example.com",
    "profilePicture": "https://res.cloudinary.com/..."
  }
]
```

```
❌ 401 Unauthorized
```
```json
{ "message": "Unauthorized - No token provided" }
```

```
❌ 500 Internal Server Error
```
```json
{ "message": "Server error" }
```

---

#### `GET /api/messages/chats` 🔒 Protected
> Return only the users with whom the caller has an existing conversation.

**Headers**
```
Cookie: jwtToken=<token>
```

**Responses**

```
✅ 200 OK
```
```json
[
  {
    "_id": "685c123",
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "profilePicture": ""
  }
]
```

```
❌ 401 Unauthorized
```
```json
{ "message": "Unauthorized - No token provided" }
```

```
❌ 500 Internal Server Error
```
```json
{ "message": "Server error" }
```

---

#### `GET /api/messages/:id` 🔒 Protected
> Retrieve the full message history between the caller and a specific user.

**URL Parameter**

| Parameter | Type | Description |
|---|---|---|
| `id` | `string` | The MongoDB `_id` of the other user |

**Example Request**
```
GET /api/messages/685c123456
Cookie: jwtToken=<token>
```

**Responses**

```
✅ 200 OK
```
```json
{
  "messages": [
    {
      "_id": "msg001",
      "senderId": "685a",
      "receiverId": "685b",
      "text": "Hey, how are you?",
      "image": "",
      "createdAt": "2026-06-16T10:00:00Z",
      "updatedAt": "2026-06-16T10:00:00Z"
    },
    {
      "_id": "msg002",
      "senderId": "685b",
      "receiverId": "685a",
      "text": "Doing great! Check this out.",
      "image": "https://res.cloudinary.com/...",
      "createdAt": "2026-06-16T10:01:00Z",
      "updatedAt": "2026-06-16T10:01:00Z"
    }
  ]
}
```

```
❌ 401 Unauthorized
```
```json
{ "message": "Unauthorized - No token provided" }
```

```
❌ 500 Internal Server Error
```
```json
{ "message": "Server error" }
```

---

#### `POST /api/messages/send/:id` 🔒 Protected
> Send a message to a user. Supports text, image, or both.

**URL Parameter**

| Parameter | Type | Description |
|---|---|---|
| `id` | `string` | The MongoDB `_id` of the recipient |

**Headers**
```
Cookie: jwtToken=<token>
Content-Type: application/json
```

**Request Body Variants**

Text only:
```json
{
  "text": "Hello there!"
}
```

Image only:
```json
{
  "image": "<base64-encoded-image-string>"
}
```

Text + Image:
```json
{
  "text": "Check this out!",
  "image": "<base64-encoded-image-string>"
}
```

**Responses**

```
✅ 200 OK
```
```json
{
  "_id": "msg003",
  "senderId": "685a",
  "receiverId": "685b",
  "text": "Hello there!",
  "image": "",
  "createdAt": "2026-06-16T12:00:00Z",
  "updatedAt": "2026-06-16T12:00:00Z"
}
```

```
❌ 401 Unauthorized
```
```json
{ "message": "Unauthorized - No token provided" }
```

```
❌ 500 Internal Server Error
```
```json
{ "message": "Server error" }
```

---

### ⚠️ Error Reference

#### Authentication Errors

| Status | Scenario | Response |
|---|---|---|
| `401` | Cookie missing | `"Unauthorized - No token provided"` |
| `401` | Token invalid or expired | `"Unauthorized - Invalid token"` |
| `401` | Token valid but user deleted | `"Unauthorized - User not found"` |

#### Arcjet Security Errors

| Status | Scenario | Response |
|---|---|---|
| `429` | Rate limit exceeded | `"Too many requests. Please try again later."` |
| `403` | Automated bot detected | `"Access denied. Bot traffic is not allowed."` |
| `403` | Spoofed user-agent | `"Access denied. Spoofed bot traffic is not allowed."` |
| `403` | Shield rule triggered | `"Access denied. Your request was blocked by Arcjet protection."` |

---

## 📧 Email Workflow

Triggered automatically on every successful signup:

```
User submits POST /api/auth/signup
              │
              ▼
     Password hashed with bcrypt
              │
              ▼
     Account saved to MongoDB
              │
              ▼
     JWT cookie set in response
              │
              ▼
     Welcome email dispatched via Resend
              │
              ▼
     User receives onboarding email 🎉
```

---

## 🖼️ Cloudinary Workflow

```
Profile Picture                   Message Image
       │                                │
       ▼                                ▼
  Base64 Upload               Base64 Upload
       │                                │
       ▼                                ▼
   Cloudinary                      Cloudinary
       │                                │
       ▼                                ▼
 Secure URL returned           Secure URL returned
       │                                │
       ▼                                ▼
 MongoDB User updated          Message saved with URL
```

---

## 🔮 Roadmap

- [ ] Socket.IO real-time messaging
- [ ] Message read receipts
- [ ] Typing indicators
- [ ] User online / presence status
- [ ] Group chats
- [ ] Message reactions
- [ ] File sharing
- [ ] Message deletion & editing
- [ ] Swagger / OpenAPI documentation
- [ ] Unit & integration tests

---

<div align="center">

**📄 MIT License — Copyright © 2026 Messenger**

*Built with Node.js · Express · MongoDB*

</div>
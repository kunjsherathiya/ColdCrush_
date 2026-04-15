# 🛒 Kryonix E-Commerce Platform

A full-stack e-commerce platform built with **Node.js**, **React.js**, and deployed on **AWS**.

---

## 📁 Project Structure

```
AWS/
├── server/          # Node.js REST API
├── client/          # React.js Customer Website
└── admin/           # React.js Admin Panel
```

---

## 🖥️ Server (Node.js)

### Tech Stack
- **Runtime** → Node.js
- **Framework** → Express.js
- **Database** → MongoDB (Mongoose)
- **Authentication** → JWT + OTP (Email)
- **Email** → Nodemailer (Gmail SMTP)
- **Payment** → Razorpay
- **Storage** → AWS S3
- **Code Quality** → ESLint + Husky

### API Endpoints

#### 👤 User
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/user/send-otp` | Send OTP to email | Public |
| POST | `/api/v1/user/verify-otp` | Verify OTP & get token | Public |

#### 📦 Product
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/product/create` | Create product | Admin |
| PUT | `/api/v1/product/update` | Update product | Admin |
| DELETE | `/api/v1/product/delete/:id` | Delete product | Admin |
| GET | `/api/v1/product/list` | List all products | Public |
| GET | `/api/v1/product/detail/:id` | Get product detail | Public |

#### 🗂️ Category
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/category/create` | Create category | Admin |
| PUT | `/api/v1/category/update` | Update category | Admin |
| DELETE | `/api/v1/category/delete/:id` | Delete category | Admin |
| GET | `/api/v1/category/list` | List categories | Admin |

#### 🖼️ Media
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/media/create` | Upload image to S3 | Admin |
| DELETE | `/api/v1/media/delete/:id` | Delete image from S3 | Admin |
| GET | `/api/v1/media/list` | List media | Admin |

#### 🛒 Cart
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/cart/create` | Add to cart | User |
| DELETE | `/api/v1/cart/delete/:id` | Remove from cart | User |
| GET | `/api/v1/cart/list` | Get cart | User |
| DELETE | `/api/v1/cart/empty` | Empty cart | User |

#### 📍 Address
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/address/create` | Add address | User |
| DELETE | `/api/v1/address/delete/:id` | Delete address | User |
| GET | `/api/v1/address/list` | List addresses | User |

#### 🧾 Order
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/order/create` | Create order | User |
| POST | `/api/v1/order/verify-payment` | Verify Razorpay payment | User |
| GET | `/api/v1/order/user-orders` | Get user orders | User |
| GET | `/api/v1/order/list` | List all orders | Admin |
| PUT | `/api/v1/order/update-status` | Update order status | User/Admin |

### Setup

```bash
cd server
npm install
cp .env.example .env
# Fill in .env values
npm run dev
```

---

## 🌐 Client (React.js - Customer Website)

### Tech Stack
- **Framework** → Create React App
- **UI Library** → Material UI (MUI)
- **Styling** → Tailwind CSS
- **Routing** → React Router DOM
- **State Management** → Redux Toolkit
- **HTTP Client** → Axios

### Pages
- 🏠 Home → Hero slider, featured products, ads banners
- 🛍️ Products → Product listing with filters
- 📄 Product Detail → Images, price, discount, add to cart
- 🛒 Cart → Cart items, qty, total
- 👤 Login/Register → OTP based authentication
- 📦 Orders → Order history, status tracking
- 📍 Address → Manage delivery addresses
- 💳 Checkout → Address selection, payment (COD/Online)

### Setup

```bash
cd client
npm install
npm start
```

---

## 🔧 Admin Panel (React.js)

### Tech Stack
- **Framework** → Create React App
- **UI Library** → Material UI (MUI)
- **Styling** → Tailwind CSS
- **Routing** → React Router DOM
- **State Management** → Redux Toolkit
- **HTTP Client** → Axios

### Pages
- 📊 Dashboard → Sales overview, recent orders
- 📦 Products → Add, edit, delete products
- 🗂️ Categories → Manage categories
- 🖼️ Media → Upload, manage images (S3)
- 🧾 Orders → View all orders, update status
- 👥 Users → View registered users
- 🎯 Ads & Sliders → Manage banners and sliders

### Setup

```bash
cd admin
npm install
npm start
```

---

## ☁️ AWS Services

| Service | Usage |
|---------|-------|
| S3 | Image storage |
| SES | Email (OTP + Bill) |
| Elastic Beanstalk | Server deployment |
| CloudFront | CDN for S3 images |
| RDS / DocumentDB | Database (optional) |

---

## 🔐 Environment Variables

```env
PORT=5000
NODE_ENV=development

# AWS
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET_NAME=

# MongoDB
MONGO_URI=
MONGO_LOCAL_URI=

# Email
EMAIL_USER=
EMAIL_PASS=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# JWT
JWT_SECRET=
JWT_EXPIRES_IN=7d
```

---

## 🚀 Deployment

### Server → AWS Elastic Beanstalk
```bash
eb init
eb create
eb deploy
```

### Client & Admin → AWS S3 + CloudFront
```bash
npm run build
aws s3 sync build/ s3://your-bucket-name
```

---

## 📄 License
MIT © Kryonix



---

# 🛒 InkSpire – Full Stack E-commerce Platform


**Live Demo:** [https://inkspire-steel.vercel.app](https://inkspire-steel.vercel.app)

InkSpire is a powerful, fully responsive full-stack e-commerce web application built using modern technologies. It includes a customer-facing storefront and a robust admin dashboard for managing products, users, orders, and more. This platform supports Stripe payment integration and follows scalable coding principles such as the MVC pattern on the backend.

---

## 🚀 Features

### 👥 User-Facing (Frontend)

* 🛍️ Browse products by categories, brands, and attributes
* 🔍 Real-time search and filter functionality
* 🧾 Product detail pages with rich descriptions and attributes
* 🛒 Add to cart, wishlist, and purchase functionality
* 💳 Stripe payment gateway integration
* 🚚 Order tracking system
* 🔐 JWT-based user authentication & registration
* 📧 Subscribe to newsletters
* 📞 Contact form to reach admin

### 🛠 Admin Dashboard

* 📊 Dashboard Summary: Sales, users, orders
* 👤 User management (view, update, delete)
* 📦 Product management (create, update, delete)
* 🏷️ Category, Brand, Attribute management
* 📸 Slider/banner management
* 📨 Contact message and subscriber management
* 📦 Order management (view, update status)
* 🧾 Dynamic data handling with Ant Design tables & Material Tailwind components

---

## 🧑‍💻 Tech Stack

### Frontend

* **React.js**
* **Redux Toolkit**
* **Tailwind CSS**
* **Ant Design** + **Material Tailwind**
* **Axios** for API requests
* **JWT Authentication**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Prisma ORM**
* **MVC Architecture**
* **Stripe API** for payment integration
* **CORS**, **Helmet**, **dotenv** for security and environment management

---

## 📁 Project Structure

```
📦inkspire
 ┣ 📂client             // React frontend
 ┃ ┣ 📂components       // Reusable UI components
 ┃ ┣ 📂pages            // Routing and views
 ┃ ┣ 📂redux            // Redux store & slices
 ┃ ┗ 📂styles           // Tailwind and custom styles
 ┃
 ┣ 📂server             // Node.js backend
 ┃ ┣ 📂controllers      // Business logic
 ┃ ┣ 📂models           // Prisma models
 ┃ ┣ 📂routes           // API endpoints
 ┃ ┣ 📂middlewares      // JWT auth, error handlers, etc
 ┃ ┗ 📂utils            // Helper functions (e.g., email, stripe)
```

---

## 🔐 Authentication

* Secure **JWT-based** auth
* Protected routes for users and admin
* Role-based access control in dashboard

---

## 💳 Payment Integration

* Integrated **Stripe Checkout**
* Secure handling of payment and order confirmation
* Order status management from admin dashboard

---


## 📝 License

This project is licensed under the MIT License.


# 🛒 PTR's Store – Modern Shopping Platform

A fully functional **Premium E-Commerce Web App** built using **React.js, Vite, Firebase, and Framer Motion**. This platform includes secure user authentication, specific admin dashboard with live stats, product management, real-time cart synchronization across devices, and a payment simulation system.

### 🚀 **Live & Working**
- **🌐 Live Demo:** [http://ptr-store-corizo-xy9z.surge.sh](http://ptr-store-corizo-xy9z.surge.sh)
- **🔗 GitHub:** [https://github.com/tejrohitparuchuri/TEJ-ROHIT-s-Corizo-Major-Project](https://github.com/tejrohitparuchuri/TEJ-ROHIT-s-Corizo-Major-Project)

---

## 📸 Preview
> *A modern, responsive interface designed for the best user experience.*

| Home Page | Admin Dashboard |
|-----------|-----------------|
| ![Home](https://source.unsplash.com/random/800x600/?shopping,website) | ![Admin](https://source.unsplash.com/random/800x600/?dashboard,analytics) |

---

## 📁 Project Structure

```bash
PTR-Store/
├── src/
│   ├── components/      # Reusable UI components (Navbar, etc.)
│   ├── context/         # Global State (Auth, Cart, Products, Theme)
│   ├── data/            # Static data fallbacks
│   ├── pages/           # Main App Pages
│   │   ├── Home.jsx     # Landing Page with Hero & Grid
│   │   ├── Cart.jsx     # Cart Management & Checkout
│   │   ├── Admin.jsx    # Admin Dashboard with CRUD & Stats
│   │   ├── SignIn.jsx   # Authentication
│   │   ├── SignUp.jsx   # user Registration
│   │   └── Success.jsx  # Order Confirmation / Bill Generation
│   ├── firebase.js      # connection to Google Firebase
│   ├── main.jsx         # Entry point
│   └── App.jsx          # Routing & Layout
├── public/              # Static assets
└── index.html           # HTML Entry
```

---

## 🧠 Key Features

### 🔐 **User System**
- **Authentication:** Secure Login & Registration using Firebase Auth.
- **Profile:** Stores user details (Name, Age, Email) in Cloud Firestore.

### 🛍 **Shopping Experience**
- **Dynamic Product Grid:** Fetches products from Firestore with search & filtering.
- **Smart Cart:** **Live synchronization** of cart items across multiple devices (Mobile/Desktop).
- **Payment Simulation:** Realistic checkout process with loading states and automated bill generation.

### 👑 **Admin Dashboard (Exclusive)**
- **Protected Route:** Only accessible by authorized admins.
- **Live Stats:** Real-time counter for Total Users, Products, and Active Carts.
- **Product Management:** Add, Edit, and Delete products with image URLs and descriptions.
- **User Database:** View list of all registered users in a clean table.

### 🎨 **UI/UX Design**
- **Dark/Light Mode:** Full theming support.
- **Animations:** Smooth transitions using `framer-motion`.
- **Responsive:** Perfectly optimized for Mobile, Tablet, and Desktop.

---

## 🚀 Technologies Used
- **Frontend:** React.js, Vite
- **Styling:** CSS3, CSS Variables, Framer Motion
- **Backend/Database:** Firebase Authentication, Cloud Firestore
- **Deployment:** Surge.sh

---

## 🔮 Future Enhancements
- 💳 Integration with Razorpay/Stripe (Real Payments).
- 📦 Order History & Tracking page for users.
- ⭐ Product Reviews & Star Ratings system.
- 📩 Email Notifications for order success.

---

## 👨‍💻 Developed By

**Tej Rohit Paruchuri**  
🎓 **B.Tech – Computer Science and Engineering**  
🏫 **Anurag University**

---

### 📬 Contact
- 📧 **Email:** [tejrohitparuchuri@gmail.com](mailto:tejrohitparuchuri@gmail.com)
- 🔗 **GitHub:** [https://github.com/tejrohitparuchuri](https://github.com/tejrohitparuchuri)

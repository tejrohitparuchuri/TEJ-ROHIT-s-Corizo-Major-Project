# 🛒 PTR's Store – Modern Shopping Platform

A fully functional **Premium E-Commerce Web App** built using **React.js, Vite, Firebase, and Framer Motion**. This platform includes secure user authentication, specific admin dashboard with live stats, product management, real-time cart synchronization across devices, and a payment simulation system.

### 🚀 **Live & Working**
- **🌐 Live Demo:** [https://corizo-edutech.web.app](https://corizo-edutech.web.app)
- **🔗 GitHub:** [https://github.com/tejrohitparuchuri/TEJ-ROHIT-s-Corizo-Major-Project](https://github.com/tejrohitparuchuri/TEJ-ROHIT-s-Corizo-Major-Project)

---

## 📸 Preview
> *A modern, responsive interface designed for the best user experience.*

<table align="center">
  <tr>
    <td align="center">
      <img src="./web%20preview/homepage.png" width="400" />
      <br />
      <b>Homepage Landing</b>
    </td>
    <td align="center">
      <img src="./web%20preview/admin_dashboard_new.png" width="400" />
      <br />
      <b>Admin Dashboard</b>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="./web%20preview/sign%20in.png" width="400" />
      <br />
      <b>Sign In</b>
    </td>
    <td align="center">
      <img src="./web%20preview/register.png" width="400" />
      <br />
      <b>Registration</b>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="./web%20preview/search.png" width="400" />
      <br />
      <b>Search & Filter</b>
    </td>
    <td align="center">
      <img src="./web%20preview/cart_new.png" width="400" />
      <br />
      <b>Shopping Cart</b>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="./web%20preview/order_success.png" width="400" />
      <br />
      <b>Payment Success & Bill</b>
    </td>
    <td align="center">
      <img src="./web%20preview/settings.png" width="400" />
      <br />
      <b>Settings & Profile</b>
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center">
      <img src="./web%20preview/firebase_firestore.png" width="400" />
      <br />
      <b>Firestore Database</b>
    </td>
  </tr>
</table>

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


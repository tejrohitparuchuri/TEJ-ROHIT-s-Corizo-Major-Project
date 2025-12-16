# 🛒 PTR's Store – Modern Shopping Platform

A fully functional **Premium E-Commerce Web App** built using **React.js, Vite, Firebase, and Framer Motion**. This platform includes secure user authentication, specific admin dashboard with live stats, product management, real-time cart synchronization across devices, and a payment simulation system.

### 🚀 **Live & Working**
- **🌐 Live Demo:** [http://ptr-store-corizo-xy9z.surge.sh](http://ptr-store-corizo-xy9z.surge.sh)
- **🔗 GitHub:** [https://github.com/tejrohitparuchuri/TEJ-ROHIT-s-Corizo-Major-Project](https://github.com/tejrohitparuchuri/TEJ-ROHIT-s-Corizo-Major-Project)


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

Preview Pages:

Homepage
<img width="300" alt="homepage" src="https://github.com/user-attachments/assets/290b8fff-96a8-47a3-928e-af3fe8da7841" />

Accounts:
  Sign in:
  <img width="1364" height="679" alt="sign in" src="https://github.com/user-attachments/assets/0cecb702-a23d-4dfa-a0ec-1e33082bf878" />
  Register:
  <img width="1365" height="767" alt="register" src="https://github.com/user-attachments/assets/ddad0ad1-ae40-4984-b698-61728be617d9" />
  Account info:
  <img width="1365" height="767" alt="acc info" src="https://github.com/user-attachments/assets/00106ad7-5f40-4a06-b246-88a87f94ab45" />

Products:
  Search:
  <img width="1365" height="767" alt="search" src="https://github.com/user-attachments/assets/c64e1456-f2e0-403d-8320-b605bebbb1a9" />
  Cart:
  <img width="1365" height="767" alt="cart" src="https://github.com/user-attachments/assets/b8c1da2a-56de-49f8-8ddb-7cffbaed2a07" />
  Purchase and Bill:
  <img width="1359" height="767" alt="bill generation" src="https://github.com/user-attachments/assets/c2548bcd-bdc5-4af8-90a0-aa8d9f923c76" />

Admin Control:
<img width="1357" height="767" alt="admin dashboard" src="https://github.com/user-attachments/assets/80305345-28c4-4e8c-9de8-a96817dfc757" />








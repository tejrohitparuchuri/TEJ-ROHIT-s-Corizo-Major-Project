import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// You can get this from the Firebase Console -> Project Settings -> General -> Your Apps
const firebaseConfig = {
    apiKey: "AIzaSyCdMm8Dk27zt9AZkEcWFHt75NhWvPfUCeI",
    authDomain: "corizo-edutech.firebaseapp.com",
    projectId: "corizo-edutech",
    storageBucket: "corizo-edutech.firebasestorage.app",
    messagingSenderId: "700249578406",
    appId: "1:700249578406:web:f4dc360e08f3ab8b450d67",
    measurementId: "G-066RPYSJTH"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

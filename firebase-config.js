// firebase-config.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDgOCX7AUlnTvkM2VQWU9ja9TIZ2dxIvo",
    authDomain: "yn-consultoria-logistica-bd.firebaseapp.com",
    projectId: "yn-consultoria-logistica-bd",
    storageBucket: "yn-consultoria-logistica-bd.appspot.com",
    messagingSenderId: "224192954537",
    appId: "1:224192954537:web:001329924bf31c08b8a9b8",
    measurementId: "G-HZLKW7KJZ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Export the database reference for use in other modules
export { database };

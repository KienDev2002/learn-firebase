import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBQy5bh-a4DcwwOUg8BHgrqd8zXT3TUpxI",
    authDomain: "learn-firebase-13a05.firebaseapp.com",
    projectId: "learn-firebase-13a05",
    storageBucket: "learn-firebase-13a05.appspot.com",
    messagingSenderId: "767871807778",
    appId: "1:767871807778:web:f9b730f506e2d93944f57b",
    measurementId: "G-EFFR0ZQ1FS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// init services: thêm, xóa, sửa db
export const db = getFirestore(app);

export const auth = getAuth(app);

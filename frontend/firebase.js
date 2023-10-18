// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "mern-real-estate-66604.firebaseapp.com",
	projectId: "mern-real-estate-66604",
	storageBucket: "mern-real-estate-66604.appspot.com",
	messagingSenderId: "805479929312",
	appId: "1:805479929312:web:4d5eef3c64a02acc798785",
	measurementId: "G-V8PZPGCNHX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

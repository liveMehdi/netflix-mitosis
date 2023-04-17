// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeQ4xJbHALTdZb-e0vjS-MM1b6DaD1OgQ",
  authDomain: "project-netflix-clone-96e89.firebaseapp.com",
  projectId: "project-netflix-clone-96e89",
  storageBucket: "project-netflix-clone-96e89.appspot.com",
  messagingSenderId: "794770835080",
  appId: "1:794770835080:web:b1dbb8102f381e922c413d"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }

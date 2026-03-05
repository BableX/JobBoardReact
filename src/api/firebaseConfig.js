import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyD6Ylv7elTI6FLN5j2xqzAPWQ_-7Su7dWY",
  authDomain: "searchjob-6b722.firebaseapp.com",
  projectId: "searchjob-6b722",
  storageBucket: "searchjob-6b722.firebasestorage.app",
  messagingSenderId: "542721260822",
  appId: "1:542721260822:web:fec133e620f6b3f3022437",
  measurementId: "G-T8MFSHT3HH"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
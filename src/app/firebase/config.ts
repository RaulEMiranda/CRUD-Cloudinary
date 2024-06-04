import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGZfJ6Wzw9CcqpFTdYXg--1PfuNVrffgw",
  authDomain: "nextj-auth-rtk.firebaseapp.com",
  projectId: "nextj-auth-rtk",
  storageBucket: "nextj-auth-rtk.appspot.com",
  messagingSenderId: "266390350755",
  appId: "1:266390350755:web:b980e21b9d4b0318714816",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAFLTzuoI07qtoY9uCnqLY27bwmMY5GsGs",
    authDomain: "restarante-da-vivi.firebaseapp.com",
    projectId: "restarante-da-vivi",
    storageBucket: "restarante-da-vivi.firebasestorage.app",
    messagingSenderId: "511517751933",
    appId: "1:511517751933:web:ae965edc36deda467acf14"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { auth, db, database };
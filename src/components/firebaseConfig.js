// Importa a função de inicialização do Firebase
import { initializeApp } from "firebase/app";
// Importa os SDKs que você vai usar (Firestore, Autenticação, etc.)
import { getFirestore } from "firebase/firestore"; // Para usar o Firestore
import { getAuth } from "firebase/auth"; // Para usar a autenticação

// Sua configuração Firebase (copiada do Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAFLTzuoI07qtoY9uCnqLY27bwmMY5GsGs",
  authDomain: "restarante-da-vivi.firebaseapp.com",
  projectId: "restarante-da-vivi",
  storageBucket: "restarante-da-vivi.firebasestorage.app",
  messagingSenderId: "511517751933",
  appId: "1:511517751933:web:ae965edc36deda467acf14"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o Firestore e a Autenticação
export const db = getFirestore(app);
export const auth = getAuth(app);


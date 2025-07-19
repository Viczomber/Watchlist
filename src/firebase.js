// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Tu configuración
const firebaseConfig = {
  apiKey: "AIzaSyAALfMi24tiG13IbdkzfA3TIxKD2Wn2EwQ",
  authDomain: "watchlist-ea838.firebaseapp.com",
  projectId: "watchlist-ea838",
  storageBucket: "watchlist-ea838.appspot.com", // CORREGIDO: .app → .appspot.com
  messagingSenderId: "779588278927",
  appId: "1:779588278927:web:6e7c05f65dafbc50946efa",
  measurementId: "G-QWSRLY9RD1"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios que usaremos
export const db = getFirestore(app);
export const auth = getAuth(app);

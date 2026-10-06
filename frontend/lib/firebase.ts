import { initializeApp, getApps } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "demo-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-semana5",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);

if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  try {
    connectFirestoreEmulator(db, "localhost", 8080);
  } catch (err) {
    console.log("Emulador já conectado", err);
  }
}
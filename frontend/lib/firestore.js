import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let db;

function getDb() {
  if (!db) {
    const app = getApps().length ? getApp() : initializeApp(config);
    db = getFirestore(app);
    if (process.env.NEXT_PUBLIC_USE_EMULATOR === "true") {
      connectFirestoreEmulator(db, "127.0.0.1", 8080);
    }
  }
  return db;
}

export async function getItemsFromFirestore() {
  const snap = await getDocs(query(collection(getDb(), "items"), orderBy("ordem")));
  return { status: "ok", items: snap.docs.map((d) => d.data().titulo) };
}
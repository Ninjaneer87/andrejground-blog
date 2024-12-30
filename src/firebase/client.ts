import { initializeApp } from 'firebase/app';
import SECRETS from 'astro:env/server';

const firebaseConfig = {
  apiKey: SECRETS.FIREBASE_API_KEY,
  authDomain: SECRETS.FIREBASE_AUTH_DOMAIN,
  projectId: SECRETS.FIREBASE_PROJECT_ID,
  storageBucket: SECRETS.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: SECRETS.FIREBASE_MESSAGING_SENDER_ID,
  appId: SECRETS.FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);

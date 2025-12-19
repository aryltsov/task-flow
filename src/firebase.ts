import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAiIvxuo8x6mjnPFDY4MBwZGatIFoNBK1c',
  authDomain: 'task-flow-bb0fa.firebaseapp.com',
  projectId: 'task-flow-bb0fa',
  storageBucket: 'task-flow-bb0fa.firebasestorage.app',
  messagingSenderId: '167467814420',
  appId: '1:167467814420:web:f18c85ba286083ecb7e101',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

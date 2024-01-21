import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDpEGDtigi1Ckuo4kog1moxatZa_cXTICY',
  authDomain: 'typingt-415ed.firebaseapp.com',
  projectId: 'typingt-415ed',
  storageBucket: 'typingt-415ed.appspot.com',
  messagingSenderId: '261846162874',
  appId: '1:261846162874:web:a162e4ec5c536c0e4e9183',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

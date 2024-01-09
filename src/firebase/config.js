// import * as firebase from 'firebase';
// import firestore from 'firebase/firestore'
// import firestore from '@firebase/firestore';
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: 'AIzaSyC3up_hGbU5JA5-2jdI5WM3_MO8Gv5_dbg',
  authDomain: 'hortel-e5883.firebaseapp.com',
  databaseURL: 'https://hortel-e5883.firebaseio.com',
  projectId: 'hortel-e5883',
  storageBucket: 'hortel-e5883.appspot.com',
  messagingSenderId: '862288269596',
  appId: '1:862288269596:android:53a50ddebbdadb2488aad9',
};


const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
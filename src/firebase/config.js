// import * as firebase from 'firebase';
// import firestore from 'firebase/firestore'
// import firestore from '@firebase/firestore';
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: 'api_key',
  authDomain: 'domain',
  databaseURL: 'url',
  projectId: 'id',
  storageBucket: 'bucket',
  messagingSenderId: 'id',
  appId: 'appid',
};


const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

import {getApp , getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCF8qHA3I8fGE2v5JBXO-bYlDQsFPjC28M",
    authDomain: "reastauantapp.firebaseapp.com",
    databaseURL: "https://reastauantapp-default-rtdb.firebaseio.com",
    projectId: "reastauantapp",
    storageBucket: "reastauantapp.appspot.com",
    messagingSenderId: "682244075945",
    appId: "1:682244075945:web:b7d5eda2960b0204be94b8"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)

const firestore = getFirestore(app)
const storage = getStorage(app)

export {app, firestore, storage}
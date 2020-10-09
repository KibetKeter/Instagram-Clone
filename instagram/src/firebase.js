import firebase from 'firebase';

const firebaseApp=firebase.initializeApp(
                                            {
                                            // Config files from firestore
                                                    apiKey: "AIzaSyDatRhKeqeEWSW_gKJiLe2P5HWnUuHbBVg",
                                                    authDomain: "instagram-clone-df95f.firebaseapp.com",
                                                    databaseURL: "https://instagram-clone-df95f.firebaseio.com",
                                                    projectId: "instagram-clone-df95f",
                                                    storageBucket: "instagram-clone-df95f.appspot.com",
                                                    messagingSenderId: "3686176352",
                                                    appId: "1:3686176352:web:a7d99160431f930dfdd505",
                                                    measurementId: "G-G2QLZJL1NC"
                                            }
                                        );

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
 
// When exporting multiple models, do not use default

export { db ,auth, storage }; 


import app  from  'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyDmNFtP_TJ4rnSHTLSSzt_oICOReMourdo",
    authDomain: "react-app-c3196.firebaseapp.com",
    databaseURL: "https://react-app-c3196.firebaseio.com",
    projectId: "react-app-c3196",
    storageBucket: "react-app-c3196.appspot.com",
    messagingSenderId: "397749994438",
    appId: "1:397749994438:web:97047a3b74e70ad7ada8c7",
    measurementId: "G-35LYH8D800"
  };



class Firebase{
   constructor(){
    app.initializeApp(firebaseConfig)

   
    this.app = app.database();

    this.storange =app.storage()
   
   } 
   
   loguin(email, password){
       return app.auth().signInWithEmailAndPassword(email,password)
   }


   logout(){
    return app.auth().signOut();    
   }

   async register( nome, email, password ){
    await app.auth().createUserWithEmailAndPassword(email, password)
   
    const uid = app.auth().currentUser.uid;

    return app.database().ref('usuarios').child(uid).set({
      nome: nome
    })
   }
  //olha se temcomunicaçãp

   isInitialized(){
      return new Promise(resolve =>{
        app.auth().onAuthStateChanged(resolve);
      })

   }

   getCurrent(){
     return app.auth().currentUser && app.auth().currentUser.email
   }
   
   
   getCurrentUid(){
     return app.auth().currentUser && app.auth().currentUser.uid
   }

   async getUserName(callback){
      if(!app.auth().getCurrent){
        return null;
      }
   
      const uid = app.auth().currentUser.uid;
      await app.database().ref('usuarios').child(uid)
      .once('value').then(callback);
    
    }


}

export default new Firebase();
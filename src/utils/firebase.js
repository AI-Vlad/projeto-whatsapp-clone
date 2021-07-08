import firebase from '../.././node_modules/firebase/app'

import "firebase/firestore"
import 'firebase/auth';
import 'firebase/storage';

export class Firebase {

    constructor() {

        this._config = {
            apiKey: "AIzaSyAC9_2ZZpJLA0V6dywRIcer5o7VtOj_yW0",
            authDomain: "whatsapp-clone-5adac.firebaseapp.com",
            projectId: "whatsapp-clone-5adac",
            storageBucket: "whatsapp-clone-5adac.appspot.com",
            messagingSenderId: "43644590775",
            appId: "1:43644590775:web:2ddc4c7f569784f0ae0b32",
            measurementId: "G-7NNHRJ8K45"
        }

        this.init()

    }

    init() {

     
        if (!window._initializedFirebase) {
            firebase.initializeApp(this._config)
            firebase.firestore().settings({

                timestampsInSnapshot: true

            })
            window._initializedFirebase = true
        }

    }    

    static db(){

        return firebase.firestore()

    }

    static hd(){

        return firebase.storage()

    }

    initAuth(){

      return new Promise ((s,f) =>{

        let provider = new firebase.auth.GoogleAuthProvider()

        firebase.auth().signInWithPopup(provider).then(result=>{

            let token = result.credential.accessToken;
            let user = result.user

            s({user, token})

        }).catch(err=>{

            f(err)

        })        

      })
    }
    

}
import { Firebase } from "../utils/firebase";
import { Model } from "./model";

export class Chat extends Model {

    constructor() {

        super()

    }

    get users() {

       return this._data.users

    }

    set users(value) {

        this._data.users = value

    }

    get timeStamp() {

        return this._data.timeStamp

    }

    set users(value) {

        this._data.timeStamp = value

    }

    static getRef() {

        return Firebase.db().collection('/chats')

    }

    static createIfNotExists(meuEmail, contactEmail) {

        return new Promise((s, f) => {

            Chat.find(meuEmail, contactEmail).then(chats => {

                if (chats.empty) {

                    Chat.create(meuEmail, contactEmail).then(chat => {

                        s(chat)

                    })

                } else {

                    chats.forEach(chat => {
                        s(chat)
                    });

                }

            }).catch(err => {

                f(err)

            })

        })

    }

    static find(meuEmail, contactEmail) {

        return Chat.getRef()
            .where(btoa(meuEmail), '==', true)
            .where(btoa(contactEmail), '==', true)
            .get()

    }

    static create(meuEmail, contactEmail) {

        return new Promise((s, f) => {

            let users = {}

            users[btoa(meuEmail)] = true
            users[btoa(contactEmail)] = true

            Chat.getRef().add({

                users,
                timeStamp: new Date()

            }).then(doc => {

                Chat.getRef().doc(doc.id).get().then(chat => {
                    s(chat)

                }).catch(err => {

                    f(err)
                })

            }).catch(err=>{
                f(err)
            })

        })

    }




}
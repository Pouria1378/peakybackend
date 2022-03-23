const getDB = require('../utils/database').getDB;
const mongodb = require("mongodb")

class User {
    constructor(userName, password) {
        this.userName = userName;
        this.password = password;
    }

    save() {
        const db = getDB()

        return db
            .collection('users')
            .insertOne(this)
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err)
            })
    }

    static findOne({ userName }) {
        const db = getDB()

        return db
            .collection('users')
            .findOne({ userName: userName })
            .then(user => {
                return user
            })
            .catch(err => {
                console.log(err);
            })
    }

    // static fetchAll() {
    //     const db = getDB()

    //     return db
    //         .collection('products')
    //         .find()
    //         .toArray()
    //         .then(products => {
    //             return products
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    // static deleteById(pId) {
    //     const db = getDB()

    //     return db
    //         .collection('User')
    //         .deleteOne({ _id: new mongodb.ObjectId(pId) })
    //         .then(result => {
    //             console.log(result)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })

    // }
}

module.exports = User;
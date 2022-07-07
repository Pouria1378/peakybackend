const getDB = require('../utils/database').getDB;
const mongodb = require("mongodb")

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    save() {
        const db = getDB()

        return db
            .collection('users')
            .insertOne(this)
            .then(result => {
                console.log("result", result)
            })
            .catch(err => {
                console.log(err)
            })
    }

    static findOne({ username }) {
        const db = getDB()

        return db
            .collection('users')
            .findOne({ username: username })
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
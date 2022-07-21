const getDB = require('../utils/database').getDB;

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
                console.log("user created ", result)
            })
            .catch(err => {
                console.log(err)
            })
    }

    static findOne({ username }) {
        const db = getDB()

        return db
            .collection('users')
            .findOne({ username })
            .then(user => {
                console.log("user logged in ", user)
                return user
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = User;
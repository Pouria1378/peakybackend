const getDB = require('../utils/database').getDB;
const { ObjectID } = require('bson');
const EventType = require('./eventType')

class ReserveEvent {
    constructor(
        adminUsername,
        date,
        hour,
        userEmail,
        username,
        title,
        duration,
        type,
    ) {
        this.adminUsername = adminUsername
        this.date = date
        this.hour = hour
        this.userEmail = userEmail
        this.username = username
        this.title = title
        this.duration = duration
        this.type = type
    }


    save() {
        const db = getDB()

        return db
            .collection('reservedEvent')
            .insertOne(this)
            .then(result => {
                console.log("reservedEvent inserted", result)
            })
            .catch(err => {
                console.error(err)
            })
    }

}

module.exports = ReserveEvent;
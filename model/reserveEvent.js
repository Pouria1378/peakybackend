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
        link
    ) {
        this.adminUsername = adminUsername
        this.date = date
        this.hour = hour
        this.userEmail = userEmail
        this.username = username
        this.title = title
        this.duration = duration
        this.type = type
        this.link = link
    }


    save() {
        const db = getDB()

        EventType.deleteReservedHourFromFreeTime(this.adminUsername, this.link, this.date, this.hour, this.duration)

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
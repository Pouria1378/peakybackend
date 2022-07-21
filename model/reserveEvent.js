const getDB = require('../utils/database').getDB;
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
        link,
        freeTimes,
        weekDayName
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
        this.freeTimes = freeTimes
        this.weekDayName = weekDayName
    }


    save() {
        const db = getDB()

        EventType.deleteReservedHourFromFreeTime(
            this.adminUsername,
            this.link,
            this.weekDayName,
            this.hour,
            this.duration,
            this.freeTimes,
        )

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

    static getReservedEvents({ username }) {
        const db = getDB()

        return db
            .collection('reservedEvent')
            .find({ "adminUsername": username })
            .toArray()
    }

}

module.exports = ReserveEvent;
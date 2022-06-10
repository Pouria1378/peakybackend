const getDB = require('../utils/database').getDB;
const { ObjectID } = require('bson');

class ReservedEvent {
    constructor(
        username,
        userEmail,
        date,
        hour
    ) {
        this.username = username;
        this.userEmail = userEmail;
        this.date = date;
        this.hour = hour;
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

    // static findEventLink({ link }) {
    //     const db = getDB()

    //     return db
    //         .collection('eventType')
    //         .findOne({ link: link })
    //         .then(link => {
    //             return link
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         })
    // }

    // static findAllEventTypes({ username }) {
    //     const db = getDB()

    //     return db
    //         .collection('eventType')
    //         .find({ username })
    //         .toArray()

    // }

    // static findOneEvent({ link, username }) {
    //     const db = getDB()

    //     return db
    //         .collection('eventType')
    //         .findOne({ link, username })

    // }

    // static deleteEventType(id) {
    //     const db = getDB()

    //     return db
    //         .collection('eventType')
    //         .deleteOne({ "_id": ObjectID(id) })

    // }

    // static editEventType(eventType) {
    //     const db = getDB()

    //     return db
    //         .collection('eventType')
    //         .updateOne({ "_id": ObjectID(eventType._id) }, {
    //             $set: {
    //                 title: eventType.title,
    //                 duration: eventType.duration,
    //                 type: eventType.type,
    //                 className: eventType.className,
    //                 description: eventType.description,
    //                 link: eventType.link,
    //                 freeTimes: eventType.freeTimes,
    //                 status: eventType.status
    //             }
    //         })

    // }
}

module.exports = ReservedEvent;
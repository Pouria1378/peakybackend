const getDB = require('../utils/database').getDB;
const { ObjectID } = require('bson');

class EventType {
    constructor(
        username,
        title,
        duration,
        type,
        className,
        description,
        link,
        freeTimes
    ) {
        this.username = username;
        this.title = title;
        this.duration = duration;
        this.type = type;
        this.className = className;
        this.description = description;
        this.link = link;
        this.freeTimes = freeTimes;
        this.status = true;
    }

    save() {
        const db = getDB()

        return db
            .collection('eventType')
            .insertOne(this)
            .then(result => {
                console.log("eventType inserted", result)
            })
            .catch(err => {
                console.error(err)
            })
    }

    static findEventLink({ link }) {
        const db = getDB()

        return db
            .collection('eventType')
            .findOne({ link: link })
            .then(link => {
                return link
            })
            .catch(err => {
                console.error(err);
            })
    }

    static findAllEventTypes({ username }) {
        const db = getDB()

        return db
            .collection('eventType')
            .find({ username })
            .toArray()

    }

    static findOneEvent({ link, username }) {
        const db = getDB()

        return db
            .collection('eventType')
            .findOne({ link, username })

    }

    static deleteEventType(id) {
        const db = getDB()

        return db
            .collection('eventType')
            .deleteOne({ "_id": ObjectID(id) })

    }

    static editEventType(eventType) {
        const db = getDB()

        return db
            .collection('eventType')
            .updateOne({ "_id": ObjectID(eventType._id) }, {
                $set: {
                    title: eventType.title,
                    duration: eventType.duration,
                    type: eventType.type,
                    className: eventType.className,
                    description: eventType.description,
                    link: eventType.link,
                    freeTimes: eventType.freeTimes,
                    status: eventType.status
                }
            })
    }

    static deleteReservedHourFromFreeTime(username, link, date, hour, duration) {
        const db = getDB()

        db
            .collection('eventType')
            .updateOne({ "link": link, "username": username }, {
                $set: {
                    freeTimes: freeTimes
                }
            })

    }
}

module.exports = EventType;
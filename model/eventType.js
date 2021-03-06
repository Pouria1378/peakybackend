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

    static findEventLink({ link, username }) {
        const db = getDB()

        return db
            .collection('eventType')
            .findOne({ link, username })
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
                    status: eventType.status
                }
            })
    }

    static deleteReservedHourFromFreeTime(
        username,
        link,
        weekDayName,
        hour,
        duration,
        freeTimes,
    ) {
        const db = getDB()

        const indexOfReservedHour = freeTimes[weekDayName].findIndex(h => h === hour)

        const convertedDuration = +duration.split(":")[0]

        freeTimes[weekDayName].splice(indexOfReservedHour, convertedDuration)

        db
            .collection('eventType')
            .updateOne({ link, username }, {
                $set: {
                    freeTimes: freeTimes
                }
            })

    }
}

module.exports = EventType;
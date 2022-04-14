const getDB = require('../utils/database').getDB;
const mongodb = require("mongodb")

class EventType {
    constructor(
        username,
        title,
        duration,
        type,
        color,
        description,
        link,
        freeTimes
    ) {
        this.username = username;
        this.title = title;
        this.duration = duration;
        this.type = type;
        this.color = color;
        this.description = description;
        this.link = link;
        this.freeTimes = freeTimes;
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
            .find({ username: username })
            .toArray()

    }
}

module.exports = EventType;
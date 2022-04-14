const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongodb = require("mongodb")
const responseMessage = require("../functions/responseMessage")
const EventType = require('../model/eventType')

exports.createEventType = async (req, res, next) => {
    try {
        const {
            title,
            duration,
            type,
            color,
            description,
            link,
            freeTimes
        } = req.body

        const duplicatedLink = await EventType.findEventLink({ link })
        if (duplicatedLink) {
            return res
                .json(responseMessage(409))
        }

        if (!title || !duration || !type || !description || !link || !freeTimes) {
            res
                .json(responseMessage(400))
            return
        }

        const eventType = new EventType(
            req.user.username,
            title,
            duration,
            type,
            color,
            description,
            link,
            freeTimes
        )

        eventType.save()

        res
            .json(responseMessage(200))

    } catch (err) {
        console.log(err)
    }
}
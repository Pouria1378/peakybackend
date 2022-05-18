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

        if (!title || !duration || !type || !link || !freeTimes) {
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
            link.toLowerCase(),
            freeTimes
        )

        eventType.save()

        res
            .json(responseMessage(200))

    } catch (err) {
        console.log(err)
    }
}

exports.getAllEventTypes = async (req, res, next) => {
    try {
        const eventTypes = await EventType.findAllEventTypes(req.user)
        eventTypes.reverse()

        res
            .json({
                ...responseMessage(200),
                eventTypes
            })

    } catch (err) {
        console.log(err)
    }
}

exports.deleteEventType = async (req, res, next) => {
    try {
        const { id } = req.body

        if (!id) {
            res
                .json(responseMessage(400))
            return
        }

        EventType.deleteEventType(id)

        res
            .json(responseMessage(200))

    } catch (err) {
        console.log(err)
    }
}

exports.editEventType = async (req, res, next) => {
    try {
        const eventTypes = await EventType.editEventType(req.body)

        res
            .json({
                ...responseMessage(200),
                eventTypes
            })

    } catch (err) {
        console.log(err)
    }
}
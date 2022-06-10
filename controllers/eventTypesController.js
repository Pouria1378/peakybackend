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
            className,
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

        const parsedfreeTimes = JSON.parse(freeTimes)
        const convertedFreeTimes = {
            saturday: [],
            sunday: [],
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
        }
        console.log("parsedfreeTimes", parsedfreeTimes);
        for (let day in parsedfreeTimes) {
            for (let freeTime of parsedfreeTimes[day]) {
                const fromHour = []
                console.log("freeTime", freeTime);
                let from = freeTime.from.split(":")
                let to = freeTime.to.split(":")
                console.log("from", from);
                console.log("to", to);
                while (+from[0] <= +to[0]) {
                    fromHour.push(from.join(":"))
                    console.log("fromHour", fromHour);
                    if (+from[0] === +to[0] && +from[1] === +to[1]) break
                    if (+from[1] === 0) from[1] = "30"
                    else {
                        from[0] = +from[0] + 1
                        from[1] = "00"
                    }
                }
                convertedFreeTimes[day] = [...convertedFreeTimes[day], ...fromHour]
            }
        }


        const eventType = new EventType(
            req.user.username,
            title,
            duration,
            type,
            className,
            description,
            link.toLowerCase(),
            freetimes = convertedFreeTimes
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
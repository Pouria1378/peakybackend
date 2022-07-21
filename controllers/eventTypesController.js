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

        const duplicatedLink = await EventType.findEventLink({ link, username: req.user.username })

        if (duplicatedLink) {
            return res
                .json(responseMessage(415))
        }

        if (!title || !duration || !type || !link || !freeTimes) {
            return res
                .json(responseMessage(414))
        }

        const parsedfreeTimes = JSON.parse(freeTimes)
        const convertedFreeTimes = {
            sat: [],
            sun: [],
            mon: [],
            tue: [],
            wed: [],
            thu: [],
            fri: [],
        }
        for (let day in parsedfreeTimes) {
            for (let freeTime of parsedfreeTimes[day]) {
                const fromHour = []
                let from = freeTime.from.split(":")
                let to = freeTime.to.split(":")
                while (+from[0] <= +to[0]) {
                    fromHour.push(from.join(":"))
                    if (+from[0] === +to[0]) break

                    from[0] = +from[0] + 1
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
            .json(responseMessage(416))

    } catch (err) {
        console.log(err)
    }
}

exports.getAllEventTypes = async (req, res, next) => {
    try {
        const eventTypes = await EventType.findAllEventTypes(req.user)
        eventTypes.reverse()

        if (!eventTypes.length && eventTypes.length !== 0) {
            return res
                .json(responseMessage(412))
        }

        res
            .json({
                ...responseMessage(420),
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
                .json(responseMessage(419))
            return
        }

        EventType.deleteEventType(id)

        res
            .json(responseMessage(418))

    } catch (err) {
        console.log(err)
    }
}

exports.editEventType = async (req, res, next) => {
    try {
        const eventTypes = await EventType.editEventType(req.body)

        res
            .json({
                ...responseMessage(417),
                eventTypes
            })

    } catch (err) {
        console.log(err)
    }
}
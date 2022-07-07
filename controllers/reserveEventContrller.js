const responseMessage = require("../functions/responseMessage")
const EventType = require('../model/eventType')
const ReserveEvent = require('../model/reserveEvent')

exports.getReserveEventData = async (req, res, next) => {
    try {

        const data = await EventType.findOneEvent(req.body)


        if (Object.keys(data || {}).length === 0) {
            return res
                .json(responseMessage(410))
        } else {
            res
                .json({
                    ...responseMessage(200),
                    data
                })
        }



    } catch (err) {
        console.log(err)
    }
}

exports.addReserveEvent = async (req, res, next) => {
    try {
        const {
            date,
            hour,
            userEmail,
            username,
            link,
            weekDayName
        } = req.body

        const eventDataByLink = await EventType.findEventLink({ link })

        const { username: adminUsername, title, duration, type, freeTimes } = eventDataByLink

        if (
            !date ||
            !hour ||
            !link ||
            !userEmail ||
            !username
        ) {
            res
                .json(responseMessage(400))
            return
        }



        const reservedEvent = new ReserveEvent(
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
        )

        reservedEvent.save()

        res
            .json(responseMessage(200))


    } catch (err) {
        console.log(err)
    }
}

exports.getReservedEvents = async (req, res, next) => {
    try {
        const data = await ReserveEvent.getReservedEvents(req.user)

        if (data.length >= 0) {
            return res
                .json({ data, ...responseMessage(200) })
        }

        res
            .json(responseMessage(411))


    } catch (err) {
        console.log(err)
    }
}
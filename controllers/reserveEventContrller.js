const responseMessage = require("../functions/responseMessage")
const EventType = require('../model/eventType')
const ReservedEvent = require('../model/reservedEvent')

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
            username,
            userEmail,
            date,
            hour
        } = req.body

        if (!username || !userEmail || !hour || !date) {
            res
                .json(responseMessage(400))
            return
        }

        const reservedEvent = new ReservedEvent(
            username,
            userEmail,
            date,
            hour
        )

        reservedEvent.save()

        res
            .json(responseMessage(200))


    } catch (err) {
        console.log(err)
    }
}
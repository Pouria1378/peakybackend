const responseMessage = require("../functions/responseMessage")
const EventType = require('../model/eventType')
const ReserveEvent = require('../model/ReserveEvent')

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
            link
        } = req.body

        const eventDataByLink = await EventType.findEventLink({ link })

        const { username: adminUsername, title, duration, type } = eventDataByLink

        console.log("eventDataByLink", eventDataByLink);
        console.log("adminUsername", adminUsername);

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
            link
        )

        reservedEvent.save()

        res
            .json(responseMessage(200))


    } catch (err) {
        console.log(err)
    }
}
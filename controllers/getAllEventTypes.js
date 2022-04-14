const responseMessage = require("../functions/responseMessage")
const EventType = require('../model/eventType')

exports.getAllEventTypes = async (req, res, next) => {
    try {
        const eventTypes = await EventType.findAllEventTypes(req.user)
        const eventTypesArray = await eventTypes.map((eventType, i) => {
            eventType._id = i
            return eventType
        })

        res
            .json({
                ...responseMessage(200),
                ...{ eventTypes: eventTypesArray }
            })

    } catch (err) {
        console.log(err)
    }
}
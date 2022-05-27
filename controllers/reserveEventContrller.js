const responseMessage = require("../functions/responseMessage")
const EventType = require('../model/eventType')

exports.getReserveEventData = async (req, res, next) => {
    try {

        const data = await EventType.findOneEvent(req.body)

        console.log("req.body", req.body);
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
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

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body

        if (!(username && password)) {
            res.status(400).send("All input is required")
            return
        }

        const user = await User.findOne({ username })

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {
                    user_id: new mongodb.ObjectId(user._id),
                    username
                },
                "secret",
                {
                    expiresIn: "48h",
                }
            )

            user.token = token

            res
                .json({ token, ...responseMessage(200) })

            return
        }

        res
            .json(responseMessage(400))

    } catch (err) {
        console.log(err);
    }
}
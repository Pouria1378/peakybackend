const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongodb = require("mongodb")
const responseMessage = require("../functions/responseMessage")

exports.register = async (req, res, next) => {
    try {
        const { username, password } = req.body

        if (!(username && password)) {
            return res
                .send(responseMessage(414))
        }

        const oldUser = await User.findOne({ username })

        if (oldUser) {
            return res
                .json(responseMessage(409))
        }

        const encryptedPassword = await bcrypt.hash(password, 10)

        const user = new User(username, encryptedPassword)

        const token = jwt.sign(
            {
                userId: new mongodb.ObjectId(user._id),
                username: username
            },
            "secret",
            {
                expiresIn: "48h",
            }
        );

        user.save();

        user.token = token

        res
            .json(responseMessage(201))

    } catch (err) {
        console.log(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body

        if (!(username && password)) {
            res
                .json(responseMessage(414))
            return
        }

        const user = await User.findOne({ username })

        if (!user) {
            res
                .json(responseMessage(400))

            return
        }

        if (!await bcrypt.compare(password, user.password)) {
            res
                .json(responseMessage(413))

            return
        }

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
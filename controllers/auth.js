const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongodb = require("mongodb")
const responseMessage = require("../functions/responseMessage")

exports.register = async (req, res, next) => {
    try {
        const { username, password } = req.body

        if (!(username && password)) {
            return res.status(400).send("All input is required")
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
            .json({ user, ...responseMessage(201) })

    } catch (err) {
        console.log(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body

        if (!(username && password)) {
            res.status(400).send("All input is required")

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
                .status(200)
                .json(user)
        }

        res
            .status(400)
            .json(responseMessage(400))

    } catch (err) {
        console.log(err);
    }
}
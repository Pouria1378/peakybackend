const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongodb = require("mongodb")
const responseMessage = require("../functions/responseMessage")

exports.register = async (req, res, next) => {
    try {
        const { userName, password } = req.body

        if (!(userName && password)) {
            res.status(400).send("All input is required")
        }

        const oldUser = await User.findOne({ userName })


        if (oldUser) {
            return res
                .status(409)
                .json(responseMessage(409, true, "user already exists"))
        }

        const encryptedPassword = await bcrypt.hash(password, 10)

        const user = new User(userName, encryptedPassword)

        const token = jwt.sign(
            {
                userId: new mongodb.ObjectId(user._id),
                userName: userName
            },
            "secret",
            {
                expiresIn: "48h",
            }
        );

        user.save();

        user.token = token

        res.status(201).json(user)

    } catch (err) {
        console.log(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { userName, password } = req.body

        if (!(userName && password)) {
            res.status(400).send("All input is required")
        }

        const user = await User.findOne({ userName })

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {
                    user_id: new mongodb.ObjectId(user._id),
                    userName
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
            .json(responseMessage(400, true, "Invalid credentials"))

    } catch (err) {
        console.log(err);
    }
}
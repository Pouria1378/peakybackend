const responseMessage = (statusCode) => {
    const messages = {
        200: {
            statusCode: 200,
            success: true,
            message: "Successfull",
        },
        201: {
            statusCode: 201,
            success: true,
            message: "User Successfully created",
        },
        400: {
            statusCode: 400,
            success: true,
            message: "Invalid credentials",
        },
        404: {
            statusCode: 404,
            success: false,
            message: "Page not found",
        },
        409: {
            statusCode: 409,
            success: true,
            message: "already exists",
        },

    }

    return messages[statusCode] ||
    {
        statusCode: 500,
        success: false,
        message: "Internal server error",
    }
}

module.exports = responseMessage;
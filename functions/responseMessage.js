const responseMessage = (statusCode) => {
    const messages = {
        201: {
            statusCode: 201,
            success: true,
            message: "Successfully created",
        },
        404: {
            statusCode: 404,
            success: false,
            message: "Page not found",
        },
        409: {
            statusCode: 409,
            success: false,
            message: "user already exists",
        },
        // 400, true, "Invalid credentials"
        400: {
            statusCode: 400,
            success: true,
            message: "Invalid credentials",
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
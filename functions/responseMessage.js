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
        401: {
            statusCode: 401,
            success: true,
            message: "invalid Token!",
        },
        403: {
            statusCode: 403,
            success: true,
            message: "A token is required for authentication",
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
        410: {
            statusCode: 410,
            success: true,
            message: "colul not find event",
        },
        411: {
            statusCode: 411,
            success: true,
            message: "reserved events not found",
        },
        411: {
            statusCode: 411,
            success: true,
            message: "reserved events not found",
        },
        412: {
            statusCode: 412,
            success: true,
            message: "could not file event types",
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
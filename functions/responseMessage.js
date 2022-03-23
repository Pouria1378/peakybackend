const responseMessage = (statusCode = "", success = false, message = "", errors = []) => {
    return {
        statusCode,
        success,
        message,
        errors
    };
}

module.exports = responseMessage;
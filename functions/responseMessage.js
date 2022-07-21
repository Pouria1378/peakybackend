const responseMessage = (statusCode) => {
    const messages = {
        200: {
            statusCode: 200,
            success: true,
            msg: "ورود موفقیت آمیز بود خوش آمدید",
        },
        201: {
            statusCode: 200,
            success: true,
            msg: "حساب شما با موفقیت ایجاد شد لطفا وارد شوید",
        },
        400: {
            statusCode: 200,
            success: false,
            msg: "کاربر یافت نشد",
        },
        401: {
            statusCode: 200,
            success: true,
            msg: "invalid Token!",
        },
        403: {
            statusCode: 200,
            success: true,
            msg: "A token is required for authentication",
        },
        404: {
            statusCode: 200,
            success: false,
            msg: "Page not found",
        },
        409: {
            statusCode: 200,
            success: true,
            msg: "شما حساب کاربری دارید لطفا وارد شوید",
        },
        410: {
            statusCode: 200,
            success: false,
            msg: "رویداد یافت نشد",
        },
        411: {
            statusCode: 200,
            success: true,
            msg: "reserved events not found",
        },
        411: {
            statusCode: 200,
            success: true,
            msg: "reserved events not found",
        },
        412: {
            statusCode: 200,
            success: false,
            msg: "پیدا کردن رویداد ها با مشکل مواجه شد",
        },
        413: {
            statusCode: 200,
            success: false,
            msg: "رمز اشتباه است",
        },
        414: {
            statusCode: 200,
            success: false,
            msg: "تمام ورودی ها مورد نیاز است",
        },
        415: {
            statusCode: 415,
            success: false,
            msg: "لینک رویداد تکراری است",
        },
        416: {
            statusCode: 200,
            success: true,
            msg: "رویداد با موفقیت ایجاد شد",
        },
        417: {
            statusCode: 200,
            success: true,
            msg: "رویداد با موفقیت ویرایش شد",
        },
        418: {
            statusCode: 200,
            success: true,
            msg: "رویداد با موفقیت حذف شد",
        },
        419: {
            statusCode: 200,
            success: true,
            msg: "رویداد یافت نشد",
        },
        420: {
            statusCode: 200,
            success: true,
            msg: "رویدادها یافت شد",
        },
        421: {
            statusCode: 200,
            success: true,
            msg: "اطلاعات رویداد با موفقیت یافت شد",
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
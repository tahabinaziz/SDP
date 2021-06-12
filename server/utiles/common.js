const sendResponse = function (res, success = true, message = "Ok", data = {}, statusCode = 200) {
    res.status(statusCode).json({
        success: success,
        message: message,
        data: data
    });
}

exports.sendResponse = sendResponse;
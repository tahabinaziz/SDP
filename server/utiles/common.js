const sendResponse = function (res, success = true, message = "Ok", statusCode = 200, data = {},) {
    res.status(statusCode).json({
        success: success,
        message: message,
        statusCode: statusCode,
        data: data
    });
}

exports.sendResponse = sendResponse;
const successResponse = (data) => {
    return {
        success: true,
        data: data ? data : 'No data'
    }
}
const errorResponse = (error) => {
    return {
        success: false,
        message: error
    }
}

module.exports = { successResponse, errorResponse };
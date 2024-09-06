"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOpenAiSuccessResponse = parseOpenAiSuccessResponse;
exports.parseOpenAiFailureResponse = parseOpenAiFailureResponse;
function parseOpenAiSuccessResponse(responseData) {
    let choices = JSON.parse(responseData.choices[0].message.content);
    let usuage = responseData.usage;
    let createdTime = responseData.created;
    return {
        'status_code': 200,
        'usage_data': usuage,
        'generated_content': choices,
        'generated_at': new Date(createdTime * 1000)
    };
}
function parseOpenAiFailureResponse(errorResponse) {
    var _a, _b;
    // let statusCode = 
    return {
        'status_code': errorResponse.status,
        'message': (_b = (_a = errorResponse.data) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.code
    };
}

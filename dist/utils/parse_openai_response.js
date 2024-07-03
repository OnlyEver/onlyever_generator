"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOpenAiFailureResponse = exports.parseOpenAiSuccessResponse = void 0;
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
exports.parseOpenAiSuccessResponse = parseOpenAiSuccessResponse;
function parseOpenAiFailureResponse(errorResponse) {
    let usuage = errorResponse.usuage;
    // let statusCode = 
    return {
        'status_code': errorResponse.status,
    };
}
exports.parseOpenAiFailureResponse = parseOpenAiFailureResponse;

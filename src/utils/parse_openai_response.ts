export function parseOpenAiSuccessResponse(responseData: any){
    let choices =  JSON.parse(responseData.choices[0].message.content);
    let usuage = responseData.usage;
    let createdTime = responseData.created;
    return {
        'status_code': 200,
        'usage_data': usuage,
        'generated_content':choices,
        'generated_at': createdTime
    }
}

export function parseOpenAiFailureResponse(errorResponse: any){
    let usuage = errorResponse.usuage;
    // let statusCode = 
    return {
        'status_code': errorResponse.status,


    }
}
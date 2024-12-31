export function parseOpenAiSuccessResponse(responseData: any) {
  let choices = JSON.parse(responseData.choices[0].message.content);
  let usuage = responseData.usage;
  let createdTime = responseData.created;
  return {
    status_code: 200,
    usage_data: usuage,
    generated_content: choices,
    generated_at: new Date(createdTime * 1000),
  };
}

export function parseOpenAiFailureResponse(errorResponse: any) {
  // let statusCode =
  return {
    status_code: errorResponse.status,
    message: errorResponse.data?.error?.code,
  };
}

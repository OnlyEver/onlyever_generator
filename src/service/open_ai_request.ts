import axios from "axios";
import config from "../config.js";
import { parseOpenAiFailureResponse, parseOpenAiSuccessResponse } from "../utils/parse_openai_response.js";


export async function openAIRequest(content:String,prompt:String,token:String,model: String){
    try{
    let message = [
        {
            "role": "system", "content": prompt
        },{
            "role": "user", "content": content
        }
    ];
    const url = 'https://api.openai.com/v1/chat/completions';
    let response = await axios.post(
        url,
        //data
        { 
            "model": model,
            "messages": message,
            "response_format": {"type": "json_object"},
        },
        ///config
        {
            headers : {
                Authorization : "Bearer "+ token,
                "Content-Type" : ['application/json']
            },
            
        }

    );

    if(response.status == 200){
        console.log('success');
        return parseOpenAiSuccessResponse(response.data) as any

    }else{
        console.log('failed');
        return response.statusText as any;
    }}catch (err:any) {
        return parseOpenAiFailureResponse(err.response);
    }
}

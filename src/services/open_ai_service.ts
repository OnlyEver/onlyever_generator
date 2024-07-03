import axios from "axios";
import { parseOpenAiFailureResponse, parseOpenAiSuccessResponse } from "../utils/parse_openai_response";
import { openAiEndPoint } from "../constants/api_constants";
import { ErrorLogger } from "../logger";


export class OpenAiService{
    public api_key: string;
    public model: string;
    
    constructor(apiKey: string, model:string){
        this.api_key = apiKey;
        this.model =model
    }

    async sendRequest(prompt: string,content: string){
        try{
            let message = [
                {
                    "role": "system", "content": prompt
                },{
                    "role": "user", "content": content
                }
            ];
            const url = openAiEndPoint();
            let response = await axios.post(
                url,
                { 
                    "model": this.model,
                    "messages": message,
                    "response_format": {"type": "json_object"},
                },
                {
                    headers : {
                        Authorization : "Bearer "+ this.api_key,
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
}


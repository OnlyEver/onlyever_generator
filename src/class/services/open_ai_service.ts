import { openAIRequest } from "../../service/open_ai_request";


export class OpenAiService{
    public api_key: String;
    public model: String;
    

    constructor(apiKey: String, model:String){
        this.api_key = apiKey;
        this.model =model
    }

    async sendRequest(prompt: String,content: String){
        return await openAIRequest(content,prompt,this.api_key,this.model);
    } 
}


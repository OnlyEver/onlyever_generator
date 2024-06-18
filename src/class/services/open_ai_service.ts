import { openAIRequest } from "../../service/open_ai_request";


export class OpenAiService{
    public api_key: string;
    public model: string;
    

    constructor(apiKey: string, model:string){
        this.api_key = apiKey;
        this.model =model
    }

    async sendRequest(prompt: string,content: string){
        return await openAIRequest(content,prompt,this.api_key,this.model);
    } 
}


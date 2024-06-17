import { OpenAiService } from "../class/services/open_ai_service";
import { returnTypologyData } from "../parse_response/response_format_typology";
// import { openAIRequest } from "../service/open_ai_request.js";

export async function generateTypology(openAiService: OpenAiService,  prompt: String,message:String){
    try{
        // let openAiService = new OpenAiService(config.openAIKey)
        let response = await openAiService.sendRequest(prompt,message);
        // let response = returnTypologyData();
        return response;
    }catch(e){
       throw e;
    }
}
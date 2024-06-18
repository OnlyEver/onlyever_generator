import { OpenAiService } from "../class/services/open_ai_service";
import { returnTypologyData } from "../parse_response/response_format_typology";

export class GenerateTypology{
    public openAiService: OpenAiService;
    public prompt:string = '';
    public content:string = '';
    constructor(openAiService: OpenAiService, prompt:string,content:string){
        this.openAiService = openAiService;
        this.prompt = prompt;
        this.content = content;
    }
    async generate(){
      const response =  await this.openAiService?.sendRequest(this.prompt,this.content);
      response['type'] = 'typology';
      response.metadata = {
        "req_time": response.generated_at,
        "req_type": response.type,
        "req_tokens": response.usage_data.prompt_tokens,
        "res_tokens": response.usage_data.completion_tokens,
    };
      if(response.status_code == 200){
        return this.parseTypologyOnSuccess(response);
      } else {
        return response;
      }
    }


    parseTypologyOnSuccess(responseData : any){
        responseData.metadata.status = "completed";
        const generatedContent = responseData.generated_content;
        return {
            status_code: 200,
            metadata: responseData.metadata,
            field: generatedContent.field,
            concepts: generatedContent.concepts,
            facts: generatedContent.facts,
            generate_cards : generatedContent.generate_cards,
            summary_cards: generatedContent.summary_cards,
            type: responseData.type,
        }
    }

    async parseTypologyOnFailure(responseData:any){
        responseData.metadata.status = 'failed';
        return {
            status_code: responseData.status_code,
            metadata: responseData.metadata,
        }
    }

}
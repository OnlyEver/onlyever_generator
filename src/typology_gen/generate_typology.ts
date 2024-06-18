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
      return response;
    }


    async parseTypologyOnSuccess(){

    }

    async parseTypologyOnFailure(){}

}
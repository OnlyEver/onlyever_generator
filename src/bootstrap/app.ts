import { ParseSourceContent } from "../class/parse/parse_source_content";
import { OpenAiService } from "../class/services/open_ai_service";
import { returnCardGenPrompt } from "../constants/prompts/card_gen_prompt";
import { returnTypologyPrompt } from "../constants/prompts/typology_prompt";
import { GenerateArgs } from "../utils/generate_args";

export class OnlyEverGenerator{
    public api_key: string = '';
    public openAiService: OpenAiService | undefined;
    parsedContent: String = '';
    constructor(apiKey:string, model: String, content: Array<any>){
        this.api_key = apiKey;
        this.openAiService = new OpenAiService(apiKey,model ?? 'gpt-3.5-turbo-1106');
        this.parsedContent = new ParseSourceContent(content).parse();
    };

    typologyResponse = {};
    cardgenResponse = {};
    summarizeResponse = {};

    
    

    async generate( 
       generate_card : boolean = false,
       generate_typology: boolean =false,
    ): Promise<Array<any>> {
      let typologyPrompt = returnTypologyPrompt();
      let cardPrompt = returnCardGenPrompt();
      let args = new GenerateArgs(
        generate_card,
        generate_typology,
        false,
        {
          typology_prompt: typologyPrompt,
          card_gen_prompt: cardPrompt,
          summary_prompt: ''
        },
        
      );
        const responseToReturn = [];
        const whatNeedsToBeGenerated = args.getWhatNeedsToBeGenerated();
        for(let elem of whatNeedsToBeGenerated)
        if(elem == 'generate_tyopology'){
            this.typologyResponse = await this.generateTypology(args.prompts.typology_prompt ?? '', this.parsedContent);
            responseToReturn.push(this.typologyResponse);
        }else if(elem == 'generate_card'){

            this.cardgenResponse =  await this.generateCard(args.prompts.card_gen_prompt ?? '', this.parsedContent +  JSON.stringify(this.typologyResponse));
            responseToReturn.push(this.cardgenResponse);
        }else if(elem == 'generate_summary'){
            this.summarizeResponse = await this.generateSummary(args.prompts.summary_prompt ?? '', this.parsedContent);
            responseToReturn.push(this.summarizeResponse);
        }

        return responseToReturn;
        
    }
    
    _returnParsedContent(){
        return this.parsedContent;
    }


    async generateCard(prompt: String, content: String){
        let response =  await this.openAiService?.sendRequest(prompt,this.parsedContent);
        response['type'] = 'card_gen';
        return response;
    }

    async generateTypology(prompt:String,content:String){
        let response =  await this.openAiService?.sendRequest(prompt,this.parsedContent);
        response['type'] = 'typology';
        return response;
    }

    async generateSummary(prompt:String,content:String){
        let response = await this.openAiService?.sendRequest(prompt,this.parsedContent);
        response['type']= 'summary';
        return response;
    }
    
}
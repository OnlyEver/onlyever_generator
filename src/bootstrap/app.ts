import { GenerateCards } from "../card_gen/generate_cards";
import { ParseSourceContent } from "../parse/parse_source_content";
import { OpenAiService } from "../services/open_ai_service";
import { returnCardGenPrompt } from "../constants/prompts/card_gen_prompt";
import { returnTypologyPrompt } from "../constants/prompts/typology_prompt";
import { GenerateTypology } from "../typology_gen/generate_typology";
import { GenerateArgs } from "../utils/generate_args";
import { returnFields } from "../constants/source_data";
import { returnTypologyData } from "../parse/response_format_typology";


/// OnlyEverGenerator 

export class OnlyEverGenerator{
    public api_key: string = '';
    public openAiService: OpenAiService;
    parsedContent: string = '';
    expectedFields: Array<string>
    constructor(apiKey:string, model: string, content: Array<any>, expected_fields: Array<string>){
        this.api_key = apiKey;
        this.openAiService = new OpenAiService(apiKey,model ?? 'gpt-3.5-turbo-1106');
        this.parsedContent = new ParseSourceContent(content).parse();
        this.expectedFields = returnFields()
    };

    typologyResponse = {};
    cardgenResponse = {};
    summarizeResponse = {};

    
    

    async generate( 
       generate_typology: boolean =false,
       generate_card : boolean = false,
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
            this.typologyResponse = await this.generateTypology(args.prompts.typology_prompt ?? '');
            responseToReturn.push(this.typologyResponse);
        }else if(elem == 'generate_card'){
            let generateCards = new GenerateCards(this.openAiService);
            this.cardgenResponse =  await generateCards.generateCards(args.prompts.card_gen_prompt ?? '', this.parsedContent +  JSON.stringify(this.typologyResponse));
            responseToReturn.push(this.cardgenResponse);
        }

        return responseToReturn;
        
    }
    
    _returnParsedContent(){
        return this.parsedContent;
    }


    async generateCard(prompt: string, content: string){
        let typologyResponse = returnTypologyData();
        let generateCards = new GenerateCards(this.openAiService);
        let cardgenResponse =  await generateCards.generateCards(prompt ?? '', this.parsedContent +  JSON.stringify(typologyResponse));
        // let response =  await this.openAiService?.sendRequest(prompt,this.parsedContent);
        // response['type'] = 'card_gen';
         return cardgenResponse;
    }

    async generateTypology(prompt:string){
        let response =  await new GenerateTypology(
            this.openAiService,
            prompt,
            this.parsedContent,
            this.expectedFields,
        ).generate();
        return response;
    }
    
}
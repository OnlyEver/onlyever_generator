
import { ParseSourceContent } from "./class/parse/parse_source_content";
import { OpenAiService } from "./class/services/open_ai_service";
// const app = express();
// const port = 3000;
// let openAiService = new OpenAiService(config.openAIKey);



// let oeGen =  new OnlyEverGenerator(config.openAIKey, returnSourceData())
// app.get('/', async (req, res)  => {
//     let data = oeGen.returnParsedContent();
//     // let parsedData = parseResponse()
//     res.send(data);
// });

// app.get('/openAI', async (req,res)=> {
//   // let prompt = returnPromt();
  
//   let prompt = returnCardGenPrompt();
//     let content = returnSourceData().toString()
//     let headings = returnHeadings();
//     // let aiRequest = await openAIRequest(prompt,content);
//     let aiRequest = await oeGen.generateCard(prompt,content);
//     res.send(aiRequest);
// }); 

// app.get('/typology', async(req,res)=>{
//   { 
//     let typologyPrompt = returnTypologyPrompt();
//     let cardPrompt = returnCardGenPrompt();
//     let args = new GenerateArgs(
//       true,
//       true,
//       false,
//        {
//         typology_prompt: typologyPrompt,
//         card_gen_prompt: cardPrompt,
//         summary_prompt: "",
//       }
//     )
//     let typologyRequest = await oeGen.generate(
//       args,
//     );
//     res.send(typologyRequest);
  
//   }
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });









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
        args: GenerateArgs
    ): Promise<Array<any>> {
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

export class GenerateArgs{
    public generate_card : boolean = false;
    public generate_typology: boolean = false;
    public generate_summary: boolean = false;
    public prompts = {
        typology_prompt: '',
        card_gen_prompt: '',
        summary_prompt: ''
    }

    constructor(generate_card: boolean,generate_typology: boolean, generate_summary: boolean, prompts = {
        typology_prompt: '',
        card_gen_prompt: '',
        summary_prompt: ''
    }){
        this.generate_card = generate_card;
        this.generate_typology = generate_typology;
        this.generate_summary = generate_summary;
        this.prompts = prompts
    }

    getWhatNeedsToBeGenerated(){
        let returnData = [];
        if(this.generate_typology == true){
            returnData.push('generate_tyopology')
        }
        if(this.generate_summary == true){
            returnData.push('generate_summary')
        }
        if(this.generate_card == true){
            returnData.push('generate_card');
        }
        return returnData;
        
        
    }

}
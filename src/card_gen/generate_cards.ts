import { OpenAiService } from "../class/services/open_ai_service";

export class GenerateCards {
    openAiService: OpenAiService;
    constructor(openAiService: OpenAiService) {
        this.openAiService = openAiService;
    };


    
    

    parse(generatedData: any){
        const cardData = [];
        const usage_data = generatedData.usage_data;
        const created_at = generatedData.created_at;
        const unparsedTestCards = generatedData.test_cards;

        for(let elem of unparsedTestCards){
            if(elem.type == 'flash'){
                cardData.push(this.parseFlashCard(elem));
            } else if(elem.type == 'mcq'){
                cardData.push(this.parseFlashCard(elem));
            }else if(elem.type =='cloze'){
                cardData.push(this.parseClozeCard(elem));
            }else if(elem.type =='match'){
                cardData.push(this.parseMatchCard(elem));
            }
        }
        usage_data['created_at'] = created_at;
        usage_data['type']= 'card_gen';
        return {
            'usage_data': usage_data,
            'cards_data': cardData
        }
    }

    parseFlashCard(data:any){

    }
    parseMcqCard(data:any){
        
    }
    parseClozeCard(data:any){
        
    }
    parseMatchCard(data:any){
        
    }


}
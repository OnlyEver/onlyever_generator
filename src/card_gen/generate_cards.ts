import { ErrorLogger } from "../logger";
import { OpenAiService } from "../services/open_ai_service";

export class GenerateCards {
  openAiService: OpenAiService;
  constructor(openAiService: OpenAiService) {
    this.openAiService = openAiService;
  }

  async generateCards(prompt: string, parsedContent: string,isGapFill: boolean,headings: Array<any>) {
    let response = await this.openAiService?.sendRequest(prompt, parsedContent);
   // console.log("response to card generation ", response);
    response["type"] = isGapFill ? "gap_fill":"card_gen";
       response.metadata = {
        "req_time": response.generated_at ?? new Date(),
        "req_type": response.type,
        "req_tokens": response.usage_data?.prompt_tokens,
        "res_tokens": response.usage_data?.completion_tokens,
        "model": this.openAiService.model
    };
      if(response.status_code == 200){
        response.metadata.status = "completed";
        //return response;
       return this.parse(response, isGapFill,headings);
      } else {
        response.metadata.status = "failed";
        response.metadata.err_message = response.message;
        return response;
      }
  }

  parse(generatedData: any, isGapFill: boolean, headings:Array<any>) {
    let usage_data = generatedData.metadata;
    const status_code = generatedData.status_code;
    try{
      const cardData = [];
    const unparsedTestCards = generatedData.generated_content.test_cards;
    const type = generatedData.type;
    if(unparsedTestCards !== undefined && unparsedTestCards.length != 0) {
      for (let elem of unparsedTestCards) {
        // if(headings.includes(elem.card_reference)){

        // }else{
        //   elem.card_reference = '';
        // }
        if (elem.type == "flash") {
          cardData.push(this.parseFlashCard(elem));
        } else if (elem.type == "mcq") {
          cardData.push(this.parseMcqCard(elem));
        } else if (elem.type == "cloze") {
          cardData.push(this.parseClozeCard(elem));
        } else if (elem.type == "match") {
          cardData.push(this.parseMatchCard(elem));
        }
      }
    } else {
      if(!isGapFill) {
        usage_data.status = "failed";
      }
    }
    
   

    return {
      status_code: 200,
      metadata: usage_data,
      type: type,
      missing_concepts: [],
      missing_facts: [],
      cards_data: cardData,
    };
  }catch (e:any){
    new ErrorLogger({
      "type": 'card_parsing',
      "data": e.message,
      "response": generatedData,
     }).log();
     return {
      status_code: 500,
      metadata : usage_data,
      type:  generatedData.type,
     }
     
    //  return {
    //   status_code: 500,
    //   type: 'card_gen',
    //  }
  }
  }

  parseFlashCard(data: any) {
    let displayTitle = this.generateFlashCardDisplayTitle(
      data.card_content.front,
      data.card_content.back
    );
    let flashCardData = {
      type: {
        category: 'learning',
        sub_type: data.type,
      },
      heading: data.card_reference,
      displayTitle: displayTitle,
      content: {
        front_content: data.card_content.front,
        back_content: data.card_content.back,
      },
      concepts: data.concepts,
      facts: data.facts,
      bloomLevel: data.bloom_level,
    };

    return flashCardData;
  }

  generateFlashCardDisplayTitle(front: string, back: string) {
    return `${front} ---- ${back}`;
  }

  parseMcqCard(data: any) {
    let mcqAnswers = [];
    if(data.card_content.choices !== undefined && data.card_content.choices.length != 0) {
      for (let choice of data.card_content.choices) {
        let answer = {
          answer: choice.choice,
          is_correct: choice.is_correct,
        };
        mcqAnswers.push(answer);
      }
    }
  
    let displayTitle = this.generateMcqCardDisplayTitle(
      data.card_content.prompt,
      mcqAnswers
    );
    let mcqCard = {
       type: {
        category: 'learning',
        sub_type: data.type,
      },
      heading: data.card_reference,
      displayTitle: displayTitle,
      content: {
        question: data.card_content.prompt,
        answers: mcqAnswers,
      },
      concepts: data.concepts,
      facts: data.facts,
      bloomLevel: data.bloom_level,

    };
    return mcqCard;
  }

  generateMcqCardDisplayTitle(question: string, answers: any) {
    let answersString = [];
    if(answers.length != 0) {
      for (let option of answers) {
        let currentIndex = answers.indexOf(option) + 1;
        let temp = `${currentIndex} . ${option.answer} `;
        answersString.push(temp);
      }
      let resultString = answersString.join("");
      let finalDisplayTitle = `${question} ---- ${resultString}`;
      return finalDisplayTitle;
    } else {
return question;
    }
   
  }

  parseClozeCard(data: any) {
    let displayTitle = this.generateClozeCardDisplayTitle(
      data.card_content.prompt,
      data.card_content.options
    );
    let clozeCardData = {
      type: {
        category: 'learning',
        sub_type: data.type,
      },
      heading: data.card_reference,
      displayTitle: displayTitle,
      content: {
        question: data.card_content.prompt,
        options: data.card_content.options,
      },
      concepts: data.concepts,
      facts: data.facts,
      bloomLevel: data.bloom_level,

    };

    return clozeCardData;
  }

  generateClozeCardDisplayTitle(question: string, answers: Array<any>) {
    let optionsString = '';
    if(answers.length !== 0) {
      optionsString = answers
      .map((item: { option: any }) => {
        if(item.option !== undefined) {
          return item.option;
        } else {
          return '';
        }
      })
      .join(", ");
    }
    
    return `${question} ---- ${optionsString}`;
  }

  parseMatchCard(cardData: any) {
    let content = cardData.card_content;

    let displayTitle = this.generateMatchCardDisplayTitle(content);
    let matchCard = {
      type: {
        category: 'learning',
        sub_type: cardData.type,
      },
      heading: cardData.card_reference,
      content: content,
      //  content: cardData.card_content,
      displayTitle: displayTitle,
      concepts: cardData.concepts,
      facts: cardData.facts,
      bloomLevel: cardData.bloom_level,

    };

    return matchCard;
    
  }

  generateMatchCardDisplayTitle(answers: any) {
    let titles: string[] = [];
    let counter = 65;
    for (let data of answers) {
      
        let value = data.right_item.join(',');
        let leftData = data.left_item;
        let letter = String.fromCharCode(counter);
        titles.push(`${letter}. ${leftData} -- ${value}`);
        counter++;
    }
    let displayTitle = titles.join(",");
    return displayTitle;
  }
}



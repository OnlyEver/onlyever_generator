import { OpenAiService } from "../services/open_ai_service";

export class GenerateCards {
  openAiService: OpenAiService;
  constructor(openAiService: OpenAiService) {
    this.openAiService = openAiService;
  }

  async generateCards(prompt: string, parsedContent: string) {
    let response = await this.openAiService?.sendRequest(prompt, parsedContent);
    console.log("response to card generation ", response);
    response["type"] = "card_gen";
       response.metadata = {
        "req_time": response.generated_at,
        "req_type": response.type,
        "req_tokens": response.usage_data?.prompt_tokens,
        "res_tokens": response.usage_data?.completion_tokens,
    };
      if(response.status_code == 200){
        return this.parse(response);
      } else {
        return response;
      }
  }

  parse(generatedData: any) {
    const cardData = [];
    const usage_data = generatedData.metadata;
    const created_at = generatedData.created_at;
    const status_code = generatedData.status_code;
    const missing_concepts = generatedData.generated_content.missing_concepts;
    const missing_facts = generatedData.generated_content.missing_facts;
    const unparsedTestCards = generatedData.generated_content.test_cards;

    for (let elem of unparsedTestCards) {
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
    usage_data["created_at"] = created_at;
    usage_data["type"] = "card_gen";

    return {
      status_code: status_code,
      metadata: usage_data,
      type: usage_data.type,
      missing_concepts: missing_concepts,
      missing_facts: missing_facts,
      cards_data: cardData,
    };
  }

  parseFlashCard(data: any) {
    let displayTitle = this.generateFlashCardDisplayTitle(
      data.card_content.front,
      data.card_content.back
    );
    let flashCardData = {
      type: data.type,
      heading: data.card_reference,
      displayTitle: displayTitle,
      content: {
        front_content: data.card_content.front,
        back_content: data.card_content.back,
      },
      concepts: data.concepts,
      facts: data.facts,
    };

    return flashCardData;
  }

  generateFlashCardDisplayTitle(front: string, back: string) {
    return `${front} ---- ${back}`;
  }

  parseMcqCard(data: any) {
    let mcqAnswers = [];
    for (let choice of data.card_content.choices) {
      let answer = {
        answer: choice.choice,
        is_correct: choice.is_correct,
      };
      mcqAnswers.push(answer);
    }
    let displayTitle = this.generateMcqCardDisplayTitle(
      data.card_content.prompt,
      mcqAnswers
    );
    let mcqCard = {
      type: data.type,
      heading: data.card_reference,
      displayTitle: displayTitle,
      content: {
        question: data.card_content.prompt,
        answers: mcqAnswers,
      },
      concepts: data.concepts,
      facts: data.facts,
    };
    return mcqCard;
  }

  generateMcqCardDisplayTitle(question: string, answers: any) {
    let answersString = [];
    for (let option of answers) {
      let currentIndex = answers.indexOf(option) + 1;
      let temp = `${currentIndex} . ${option.answer} `;
      answersString.push(temp);
    }
    let resultString = answersString.join("");
    let finalDisplayTitle = `${question} ---- ${resultString}`;
    return finalDisplayTitle;
  }

  parseClozeCard(data: any) {
    let displayTitle = this.generateClozeCardDisplayTitle(
      data.card_content.text,
      data.card_content.options
    );
    let clozeCardData = {
      type: data.type,
      heading: data.card_reference,
      displayTitle: displayTitle,
      content: {
        question: data.card_content.text,
        options: data.card_content.options,
      },
      concepts: data.concepts,
      facts: data.facts,
    };

    return clozeCardData;
  }

  generateClozeCardDisplayTitle(question: string, answers: any) {
    let optionsString = answers
      .map((item: { option: any }) => item.option)
      .join(", ");
    return `${question} ---- ${optionsString}`;
  }

  parseMatchCard(cardData: any) {
    let data = cardData.card_content;
    const transformedData: { [key: string]: string[] } = {};

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        transformedData[key] = [data[key]];
        //     let value = data[key].replace(/[\[\]]/g, '');
        //  let items = data[key].split(',').map((item: string) => item.trim());
        //     map.set(key, items);
        //   }
      }
      let displayTitle = this.generateMatchCardDisplayTitle(transformedData);
      let matchCard = {
        type: cardData.type,
        heading: cardData.card_reference,
        content: transformedData,
        //  content: cardData.card_content,
        displayTitle: displayTitle,
        concepts: cardData.concepts,
        facts: cardData.facts,
      };

      return matchCard;
    }
  }

  generateMatchCardDisplayTitle(answers: any) {
    let titles: string[] = [];
    let counter = 65;
    for (let key in answers) {
      if (answers.hasOwnProperty(key)) {
        let value = answers[key];
        //     let items = value.split(',').map((item: string) => item.trim());
        //     items.forEach((item: any) => {
        let letter = String.fromCharCode(counter);
        titles.push(`${letter}. ${key} -- ${value}`);
        counter++;
        //     });
      }
    }
    let displayTitle = titles.join(",");
    return displayTitle;
  }
}

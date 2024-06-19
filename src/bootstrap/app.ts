import { GenerateCards } from "../card_gen/generate_cards";
import { ParseSourceContent } from "../parse/parse_source_content";
import { OpenAiService } from "../services/open_ai_service";
import { returnCardGenPrompt } from "../constants/prompts/card_gen_prompt";
import { returnTypologyPrompt } from "../constants/prompts/typology_prompt";
import { GenerateTypology } from "../typology_gen/generate_typology";
import { GenerateArgs } from "../utils/generate_args";
import { returnFields } from "../constants/source_data";
import { returnTypologyData } from "../parse/response_format_typology";

function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}
/// OnlyEverGenerator

export class OnlyEverGenerator {
  public api_key: string = "";
  public openAiService: OpenAiService;
  parsedContent: string = "";
  expectedFields: Array<string>;
  constructor(
    apiKey: string,
    model: string,
    content: Array<any>,
    expected_fields: Array<string>
  ) {
    this.api_key = apiKey;
    this.openAiService = new OpenAiService(
      apiKey,
      model ?? "gpt-3.5-turbo-1106"
    );
    this.parsedContent = new ParseSourceContent(content).parse();
    this.expectedFields = returnFields();
  }

  typologyResponse: any = {};
  cardgenResponse: any = {};
  summarizeResponse = {};
  gapFillResponse: any = {};

  async generate(
    generate_typology: boolean = false,
    generate_card: boolean = false
  ): Promise<Array<any>> {
    let typologyPrompt = returnTypologyPrompt();
    let cardPrompt = returnCardGenPrompt();
    let args = new GenerateArgs(generate_card, generate_typology, false, {
      typology_prompt: typologyPrompt,
      card_gen_prompt: cardPrompt,
      summary_prompt: "",
    });
    const responseToReturn = [];
    const whatNeedsToBeGenerated = args.getWhatNeedsToBeGenerated();
    for (let elem of whatNeedsToBeGenerated)
      if (elem == "generate_tyopology") {
        this.typologyResponse = await this.generateTypology(
          args.prompts.typology_prompt ?? ""
        );
        responseToReturn.push(this.typologyResponse);
      } else if (elem == "generate_card") {
        this.cardgenResponse = await this.generateCard(
          args.prompts.card_gen_prompt ?? "",
          this.parsedContent + JSON.stringify(this.typologyResponse),
          false
        );
        responseToReturn.push(this.cardgenResponse);
      }
    if (this.cardgenResponse.status_code == 200) {
      let gapFill = this.gapFilling();
      if (
        gapFill.remainingConcepts.length !== 0 ||
        gapFill.remainingFacts.length !== 0
      ) {
        this.gapFillResponse = await this.generateCard(
          args.prompts.card_gen_prompt ?? "",
          this.parsedContent +
            "Generate cards only suitable for the given remaining concepts and facts" +
            JSON.stringify(gapFill) +
            "Exclude generating these cards" +
            JSON.stringify(this.cardgenResponse.cards_data),
          true
        );
      }
      responseToReturn.push(this.gapFillResponse);
    }

    return responseToReturn;
  }

  _returnParsedContent() {
    return this.parsedContent;
  }

  async generateCard(prompt: string, content: string, isGapFill: boolean) {
    let generateCards = new GenerateCards(this.openAiService);
    let cardgenResponse = await generateCards.generateCards(
      prompt ?? "",
      content,
      isGapFill
    );
    // let response =  await this.openAiService?.sendRequest(prompt,this.parsedContent);
    // response['type'] = 'card_gen';
    return cardgenResponse;
  }

  async generateTypology(prompt: string) {
    let response = await new GenerateTypology(
      this.openAiService,
      prompt,
      this.parsedContent,
      this.expectedFields
    ).generate();
    return response;
  }

  gapFilling() {
    let allConcepts: string[] = [];
    let allFacts: string[] = [];
    let generatedConceptsList: string[] = [];
    let generatedFactsList: string[] = [];
    if (!isEmpty(this.typologyResponse)) {
      allConcepts.push(...(this.typologyResponse.concepts ?? []));
      allFacts.push(...(this.typologyResponse?.facts ?? []));
    }

    if (!isEmpty(this.cardgenResponse)) {
      allConcepts.push(...(this.cardgenResponse.missing_concepts ?? []));
      allFacts.push(...(this.cardgenResponse.missing_facts ?? []));
    }

    for (let card of this.cardgenResponse.cards_data) {
      if (card.concepts.length != 0) {
        generatedConceptsList.push(...card.concepts);
      }
      if (card.facts.length != 0) {
        generatedFactsList.push(...card.facts);
      }
    }

    let generatedConceptsSet = Array.from(new Set(generatedConceptsList));
    let generatedFactsSet = Array.from(new Set(generatedFactsList));

    let remainingConcepts: string[] = allConcepts.filter(
      (item) => !generatedConceptsSet.includes(item)
    );
    let remainingFacts: string[] = allFacts.filter(
      (item) => !generatedFactsSet.includes(item)
    );

    return {
      //   allConcepts: allConcepts,
      //   allFacts: allFacts,
      //   generatedConcepts: generatedConceptsSet,
      //   generatedFacts: generatedFactsSet,
      remainingConcepts: remainingConcepts,
      remainingFacts: remainingFacts,
    };
  }
}

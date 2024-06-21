"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlyEverGenerator = void 0;
const generate_cards_1 = require("../card_gen/generate_cards");
const parse_source_content_1 = require("../parse/parse_source_content");
const open_ai_service_1 = require("../services/open_ai_service");
const card_gen_prompt_1 = require("../constants/prompts/card_gen_prompt");
const typology_prompt_1 = require("../constants/prompts/typology_prompt");
const generate_typology_1 = require("../typology_gen/generate_typology");
const generate_args_1 = require("../utils/generate_args");
const source_data_1 = require("../constants/source_data");
const calculate_gap_fill_1 = require("../gap_fill/calculate_gap_fill");
/// OnlyEverGenerator
class OnlyEverGenerator {
    constructor(apiKey, model, content, expected_fields) {
        this.api_key = "";
        this.parsedContent = "";
        this.typologyResponse = {};
        this.cardgenResponse = {};
        this.summarizeResponse = {};
        this.gapFillResponse = {};
        this.api_key = apiKey;
        this.openAiService = new open_ai_service_1.OpenAiService(apiKey, model !== null && model !== void 0 ? model : "gpt-3.5-turbo-1106");
        this.parsedContent = new parse_source_content_1.ParseSourceContent(content).parse();
        this.expectedFields = (0, source_data_1.returnFields)();
    }
    generate() {
        return __awaiter(this, arguments, void 0, function* (generate_typology = false, generate_card = false) {
            var _a, _b, _c;
            let typologyPrompt = (0, typology_prompt_1.returnTypologyPrompt)();
            let cardPrompt = (0, card_gen_prompt_1.returnCardGenPrompt)();
            let args = new generate_args_1.GenerateArgs(generate_card, generate_typology, false, {
                typology_prompt: typologyPrompt,
                card_gen_prompt: cardPrompt,
                summary_prompt: "",
            });
            const responseToReturn = [];
            const whatNeedsToBeGenerated = args.getWhatNeedsToBeGenerated();
            for (let elem of whatNeedsToBeGenerated)
                if (elem == "generate_tyopology") {
                    this.typologyResponse = yield this.generateTypology((_a = args.prompts.typology_prompt) !== null && _a !== void 0 ? _a : "");
                    responseToReturn.push(this.typologyResponse);
                }
                else if (elem == "generate_card") {
                    if (this.typologyResponse.generate_cards) {
                        if (this.typologyResponse.generate_cards.state == false) {
                            console.log('Cards Generation Not Required');
                        }
                    }
                }
                else {
                    this.cardgenResponse = yield this.generateCard((_b = args.prompts.card_gen_prompt) !== null && _b !== void 0 ? _b : "", this.parsedContent + JSON.stringify(this.typologyResponse), false);
                    responseToReturn.push(this.cardgenResponse);
                }
            if (this.cardgenResponse.status_code == 200) {
                let gapFill = (0, calculate_gap_fill_1.gapFilling)(this.typologyResponse, this.cardgenResponse);
                if (gapFill.remainingConcepts.length !== 0 ||
                    gapFill.remainingFacts.length !== 0) {
                    this.gapFillResponse = yield this.generateCard((_c = args.prompts.card_gen_prompt) !== null && _c !== void 0 ? _c : "", this.parsedContent +
                        "Generate cards only suitable for the given remaining concepts and facts" +
                        JSON.stringify(gapFill) +
                        "Exclude generating these cards" +
                        JSON.stringify(this.cardgenResponse.cards_data), true);
                }
                responseToReturn.push(this.gapFillResponse);
            }
            return responseToReturn;
        });
    }
    generateCard(prompt, content, isGapFill) {
        return __awaiter(this, void 0, void 0, function* () {
            let generateCards = new generate_cards_1.GenerateCards(this.openAiService);
            let cardgenResponse = yield generateCards.generateCards(prompt !== null && prompt !== void 0 ? prompt : "", content, isGapFill);
            // let response =  await this.openAiService?.sendRequest(prompt,this.parsedContent);
            // response['type'] = 'card_gen';
            return cardgenResponse;
        });
    }
    generateTypology(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield new generate_typology_1.GenerateTypology(this.openAiService, prompt, this.parsedContent, this.expectedFields).generate();
            return response;
        });
    }
}
exports.OnlyEverGenerator = OnlyEverGenerator;

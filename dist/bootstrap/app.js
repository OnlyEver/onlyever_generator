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
const parse_source_content_1 = require("../class/parse/parse_source_content");
const open_ai_service_1 = require("../class/services/open_ai_service");
const card_gen_prompt_1 = require("../constants/prompts/card_gen_prompt");
const typology_prompt_1 = require("../constants/prompts/typology_prompt");
const generate_args_1 = require("../utils/generate_args");
class OnlyEverGenerator {
    constructor(apiKey, model, content) {
        this.api_key = '';
        this.parsedContent = '';
        this.typologyResponse = {};
        this.cardgenResponse = {};
        this.summarizeResponse = {};
        this.api_key = apiKey;
        this.openAiService = new open_ai_service_1.OpenAiService(apiKey, model !== null && model !== void 0 ? model : 'gpt-3.5-turbo-1106');
        this.parsedContent = new parse_source_content_1.ParseSourceContent(content).parse();
    }
    ;
    generate() {
        return __awaiter(this, arguments, void 0, function* (generate_card = false, generate_typology = false) {
            var _a, _b, _c;
            let typologyPrompt = (0, typology_prompt_1.returnTypologyPrompt)();
            let cardPrompt = (0, card_gen_prompt_1.returnCardGenPrompt)();
            let args = new generate_args_1.GenerateArgs(generate_card, generate_typology, false, {
                typology_prompt: typologyPrompt,
                card_gen_prompt: cardPrompt,
                summary_prompt: ''
            });
            const responseToReturn = [];
            const whatNeedsToBeGenerated = args.getWhatNeedsToBeGenerated();
            for (let elem of whatNeedsToBeGenerated)
                if (elem == 'generate_tyopology') {
                    this.typologyResponse = yield this.generateTypology((_a = args.prompts.typology_prompt) !== null && _a !== void 0 ? _a : '', this.parsedContent);
                    responseToReturn.push(this.typologyResponse);
                }
                else if (elem == 'generate_card') {
                    this.cardgenResponse = yield this.generateCard((_b = args.prompts.card_gen_prompt) !== null && _b !== void 0 ? _b : '', this.parsedContent + JSON.stringify(this.typologyResponse));
                    responseToReturn.push(this.cardgenResponse);
                }
                else if (elem == 'generate_summary') {
                    this.summarizeResponse = yield this.generateSummary((_c = args.prompts.summary_prompt) !== null && _c !== void 0 ? _c : '', this.parsedContent);
                    responseToReturn.push(this.summarizeResponse);
                }
            return responseToReturn;
        });
    }
    _returnParsedContent() {
        return this.parsedContent;
    }
    generateCard(prompt, content) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let response = yield ((_a = this.openAiService) === null || _a === void 0 ? void 0 : _a.sendRequest(prompt, this.parsedContent));
            response['type'] = 'card_gen';
            return response;
        });
    }
    generateTypology(prompt, content) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let response = yield ((_a = this.openAiService) === null || _a === void 0 ? void 0 : _a.sendRequest(prompt, this.parsedContent));
            response['type'] = 'typology';
            return response;
        });
    }
    generateSummary(prompt, content) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let response = yield ((_a = this.openAiService) === null || _a === void 0 ? void 0 : _a.sendRequest(prompt, this.parsedContent));
            response['type'] = 'summary';
            return response;
        });
    }
}
exports.OnlyEverGenerator = OnlyEverGenerator;

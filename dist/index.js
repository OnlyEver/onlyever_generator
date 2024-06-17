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
exports.GenerateArgs = exports.OnlyEverGenerator = void 0;
const parse_source_content_1 = require("./class/parse/parse_source_content");
const open_ai_service_1 = require("./class/services/open_ai_service");
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
class OnlyEverGenerator {
    constructor(apiKey, content) {
        this.api_key = '';
        this.parsedContent = '';
        this.typologyResponse = {};
        this.cardgenResponse = {};
        this.summarizeResponse = {};
        this.api_key = apiKey;
        this.openAiService = new open_ai_service_1.OpenAiService(apiKey);
        this.parsedContent = new parse_source_content_1.ParseSourceContent(content).parse();
    }
    ;
    generate(args) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
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
    returnParsedContent() {
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
class GenerateArgs {
    constructor(generate_card, generate_typology, generate_summary, prompts = {
        typology_prompt: '',
        card_gen_prompt: '',
        summary_prompt: ''
    }) {
        this.generate_card = false;
        this.generate_typology = false;
        this.generate_summary = false;
        this.prompts = {
            typology_prompt: '',
            card_gen_prompt: '',
            summary_prompt: ''
        };
        this.generate_card = generate_card;
        this.generate_typology = generate_typology;
        this.generate_summary = generate_summary;
        this.prompts = prompts;
    }
    getWhatNeedsToBeGenerated() {
        let returnData = [];
        if (this.generate_typology == true) {
            returnData.push('generate_tyopology');
        }
        if (this.generate_summary == true) {
            returnData.push('generate_summary');
        }
        if (this.generate_card == true) {
            returnData.push('generate_card');
        }
        return returnData;
    }
}
exports.GenerateArgs = GenerateArgs;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const card_gen_prompt_1 = require("./constants/prompts/card_gen_prompt");
const typology_prompt_1 = require("./constants/prompts/typology_prompt");
const generate_args_1 = require("./utils/generate_args");
const source_data_1 = require("./constants/source_data");
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
const port = 3000;
const app_1 = require("./bootstrap/app");
/// While Publishing the package , and using this code as a separate npm module
/// uncomment the below line and comment all the others, expect the import of OnlyEverGenerator
// export {OnlyEverGenerator};
/// All the Codes Below uses express and are strictly for development purpose, while publishing the package, comment everything
/// below this line
let oeGen = new app_1.OnlyEverGenerator(config_1.default.openAIKey, "gpt-3.5-turbo-1106", (0, source_data_1.returnSourceData)(), (0, source_data_1.returnFields)());
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let data = oeGen.returnParsedContent();
    // let parsedData = parseResponse()
    res.send(200);
}));
app.get('/openAI', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let prompt = returnPromt();
    let prompt = (0, card_gen_prompt_1.returnCardGenPrompt)();
    let content = (0, source_data_1.returnSourceData)().toString();
    let headings = (0, source_data_1.returnHeadings)();
    // let aiRequest = await openAIRequest(prompt,content);
    let aiRequest = yield oeGen.generateCard(prompt, content, false);
    res.send(aiRequest);
}));
app.get('/typology', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    {
        let typologyPrompt = (0, typology_prompt_1.returnTypologyPrompt)();
        let cardPrompt = (0, card_gen_prompt_1.returnCardGenPrompt)();
        let args = new generate_args_1.GenerateArgs(true, true, false, {
            typology_prompt: typologyPrompt,
            card_gen_prompt: cardPrompt,
            summary_prompt: "",
        });
        let typologyRequest = yield oeGen.generate(true, true);
        res.send(typologyRequest);
    }
}));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

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
exports.OpenAiService = void 0;
const open_ai_request_1 = require("../../service/open_ai_request");
class OpenAiService {
    constructor(apiKey, model) {
        this.api_key = apiKey;
        this.model = model;
    }
    sendRequest(prompt, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, open_ai_request_1.openAIRequest)(content, prompt, this.api_key, this.model);
        });
    }
}
exports.OpenAiService = OpenAiService;

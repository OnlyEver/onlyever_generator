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
exports.OpenAiService = void 0;
const axios_1 = __importDefault(require("axios"));
const parse_openai_response_1 = require("../utils/parse_openai_response");
const api_constants_1 = require("../constants/api_constants");
class OpenAiService {
    constructor(apiKey, model) {
        this.api_key = apiKey;
        this.model = model;
    }
    sendRequest(prompt, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = [
                    {
                        role: "system",
                        content: prompt,
                    },
                    {
                        role: "user",
                        content: content,
                    },
                ];
                const url = (0, api_constants_1.openAiEndPoint)();
                let response = yield axios_1.default.post(url, {
                    model: this.model,
                    messages: message,
                    response_format: { type: "json_object" },
                }, {
                    headers: {
                        Authorization: "Bearer " + this.api_key,
                        "Content-Type": ["application/json"],
                    },
                });
                if (response.status == 200) {
                    console.log("success");
                    return (0, parse_openai_response_1.parseOpenAiSuccessResponse)(response.data);
                }
                else {
                    console.log("failed");
                    return response.statusText;
                }
            }
            catch (err) {
                return (0, parse_openai_response_1.parseOpenAiFailureResponse)(err.response);
            }
        });
    }
}
exports.OpenAiService = OpenAiService;

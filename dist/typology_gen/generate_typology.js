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
exports.GenerateTypology = void 0;
class GenerateTypology {
    constructor(openAiService, prompt, content) {
        this.prompt = '';
        this.content = '';
        this.openAiService = openAiService;
        this.prompt = prompt;
        this.content = content;
    }
    generate() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const response = yield ((_a = this.openAiService) === null || _a === void 0 ? void 0 : _a.sendRequest(this.prompt, this.content));
            response['type'] = 'typology';
            response.metadata = {
                "req_time": response.generated_at,
                "req_type": response.type,
                "req_tokens": response.usage_data.prompt_tokens,
                "res_tokens": response.usage_data.completion_tokens,
            };
            if (response.status_code == 200) {
                return this.parseTypologyOnSuccess(response);
            }
            else {
                return response;
            }
        });
    }
    parseTypologyOnSuccess(responseData) {
        responseData.metadata.status = "completed";
        const generatedContent = responseData.generated_content;
        return {
            status_code: 200,
            metadata: responseData.metadata,
            field: generatedContent.field,
            concepts: generatedContent.concepts,
            facts: generatedContent.facts,
            generate_cards: generatedContent.generate_cards,
            summary_cards: generatedContent.summary_cards,
            type: responseData.type,
        };
    }
    parseTypologyOnFailure(responseData) {
        return __awaiter(this, void 0, void 0, function* () {
            responseData.metadata.status = 'failed';
            return {
                status_code: responseData.status_code,
                metadata: responseData.metadata,
            };
        });
    }
}
exports.GenerateTypology = GenerateTypology;

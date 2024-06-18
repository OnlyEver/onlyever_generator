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
            return response;
        });
    }
    parseTypologyOnSuccess() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    parseTypologyOnFailure() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.GenerateTypology = GenerateTypology;

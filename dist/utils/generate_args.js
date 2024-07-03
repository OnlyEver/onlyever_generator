"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateArgs = void 0;
class GenerateArgs {
    constructor(generate_card, generate_typology, generate_summary) {
        this.generate_card = false;
        this.generate_typology = false;
        this.generate_summary = false;
        this.generate_card = generate_card;
        this.generate_typology = generate_typology;
        this.generate_summary = generate_summary;
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

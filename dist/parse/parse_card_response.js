"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseCardResponse = void 0;
const logger_1 = require("../logger");
const parse_cloze_card_1 = require("./parse_card/parse_cloze_card");
const parse_match_card_1 = require("./parse_card/parse_match_card");
const parse_mcq_card_1 = require("./parse_card/parse_mcq_card");
class ParseCardResponse {
    parse(generatedData, isGapFill, sourceTaxonomy) {
        let usage_data = generatedData.metadata;
        try {
            const cardData = [];
            const unparsedTestCards = generatedData.generated_content.test_cards;
            const type = generatedData.type;
            if (unparsedTestCards !== undefined && unparsedTestCards.length != 0) {
                for (let elem of unparsedTestCards) {
                    if (elem.type == "flash") {
                        const flashCard = this.parseFlashCard(elem);
                        if (flashCard != null && flashCard) {
                            flashCard.heading = this._getCardReference(flashCard, sourceTaxonomy);
                            cardData.push(flashCard);
                        }
                    }
                    else if (elem.type == "mcq") {
                        const mcqCard = new parse_mcq_card_1.ParseMcqCard().parse(elem);
                        if (mcqCard != null && mcqCard) {
                            mcqCard.heading = this._getCardReference(mcqCard, sourceTaxonomy);
                            cardData.push(mcqCard);
                        }
                    }
                    else if (elem.type == "cloze") {
                        const clozeCard = new parse_cloze_card_1.ParseClozeCard().parse(elem);
                        if (clozeCard && clozeCard != null) {
                            clozeCard.heading = this._getCardReference(clozeCard, sourceTaxonomy);
                            cardData.push(clozeCard);
                        }
                    }
                    else if (elem.type == "match") {
                        const matchCard = new parse_match_card_1.ParseMatchCard().parse(elem);
                        if (matchCard && matchCard != null) {
                            matchCard.heading = this._getCardReference(matchCard, sourceTaxonomy);
                            cardData.push(matchCard);
                        }
                    }
                }
            }
            else {
                if (!isGapFill) {
                    usage_data.status = "failed";
                }
            }
            if (cardData.length == 0) {
                usage_data.status = "failed";
            }
            return {
                status_code: cardData.length == 0 ? 400 : 200,
                metadata: usage_data,
                type: type,
                missing_concepts: [],
                missing_facts: [],
                cards_data: cardData,
            };
        }
        catch (e) {
            new logger_1.ErrorLogger({
                type: "card_parsing",
                data: e.message,
                response: generatedData,
            }).log();
            return {
                status_code: 500,
                metadata: usage_data,
                type: generatedData.type,
            };
        }
    }
    parseFlashCard(data) {
        try {
            let displayTitle = this.generateFlashCardDisplayTitle(data.card_content.front, data.card_content.back);
            let flashCardData = {
                type: {
                    category: "learning",
                    sub_type: data.type,
                },
                heading: "",
                displayTitle: displayTitle,
                content: {
                    front_content: data.card_content.front,
                    back_content: data.card_content.back,
                },
                concepts: data.concepts,
                facts: data.facts,
                bloomLevel: data.bloom_level,
            };
            return flashCardData;
        }
        catch (e) {
            return null;
        }
    }
    generateFlashCardDisplayTitle(front, back) {
        return `${front} ---- ${back}`;
    }
    _getCardReference(generatedCardData, sourceTaxonomy) {
        var _a, _b, _c, _d;
        const cardConcepts = (_a = generatedCardData.concepts) !== null && _a !== void 0 ? _a : [];
        const cardFacts = (_b = generatedCardData.facts) !== null && _b !== void 0 ? _b : [];
        const combinedCardFactsAndConcepts = [...cardConcepts, ...cardFacts];
        const sourceConcepts = (_c = sourceTaxonomy.concepts) !== null && _c !== void 0 ? _c : [];
        const sourceFacts = (_d = sourceTaxonomy.facts) !== null && _d !== void 0 ? _d : [];
        const mappedSourceConcepts = sourceConcepts.map((elem) => {
            return {
                "text": elem.concept_text,
                reference: elem.reference,
            };
        });
        const mappedSourceFacts = sourceFacts.map((elem) => {
            return {
                "text": elem.fact_text,
                reference: elem.reference,
            };
        });
        const compinedConceptsAndFacts = [...mappedSourceConcepts, ...mappedSourceFacts];
        const firstMatchedConcept = compinedConceptsAndFacts.find((elem) => combinedCardFactsAndConcepts.includes(elem.text));
        if (firstMatchedConcept) {
            return firstMatchedConcept.reference;
        }
        else {
            return "";
        }
    }
}
exports.ParseCardResponse = ParseCardResponse;

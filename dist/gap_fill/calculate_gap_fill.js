"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gapFilling = gapFilling;
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
function gapFilling(typologyResponse, cardgenResponse) {
    var _a, _b, _c, _d, _e;
    let allConcepts = [];
    let allFacts = [];
    let generatedConceptsList = [];
    let generatedFactsList = [];
    let remainingConcepts = [];
    let remainingFacts = [];
    if (!isEmpty(typologyResponse)) {
        allConcepts.push(...((_a = typologyResponse.concepts) !== null && _a !== void 0 ? _a : []));
        allFacts.push(...((_b = typologyResponse === null || typologyResponse === void 0 ? void 0 : typologyResponse.facts) !== null && _b !== void 0 ? _b : []));
    }
    if (!isEmpty(cardgenResponse)) {
        allConcepts.push(...((_c = cardgenResponse.missing_concepts) !== null && _c !== void 0 ? _c : []));
        allFacts.push(...((_d = cardgenResponse.missing_facts) !== null && _d !== void 0 ? _d : []));
    }
    if (cardgenResponse.cards_data !== undefined && ((_e = cardgenResponse.cards_data) === null || _e === void 0 ? void 0 : _e.length) != 0) {
        for (let card of cardgenResponse.cards_data) {
            if (card.concepts.length != 0) {
                generatedConceptsList.push(...card.concepts);
            }
            if (card.facts.length != 0) {
                generatedFactsList.push(...card.facts);
            }
        }
        let generatedConceptsSet = Array.from(new Set(generatedConceptsList));
        let generatedFactsSet = Array.from(new Set(generatedFactsList));
        remainingConcepts = allConcepts.filter((item) => !generatedConceptsSet.includes(item));
        remainingFacts = allFacts.filter((item) => !generatedFactsSet.includes(item));
    }
    return {
        //   allConcepts: allConcepts,
        //   allFacts: allFacts,
        //   generatedConcepts: generatedConceptsSet,
        //   generatedFacts: generatedFactsSet,
        remainingConcepts: remainingConcepts,
        remainingFacts: remainingFacts,
    };
}

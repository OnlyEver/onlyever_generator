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
exports.GenerateCards = void 0;
class GenerateCards {
    constructor(openAiService) {
        this.openAiService = openAiService;
    }
    generateCards(prompt, parsedContent) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let response = yield ((_a = this.openAiService) === null || _a === void 0 ? void 0 : _a.sendRequest(prompt, parsedContent));
            console.log("response to card generation ", response);
            response["type"] = "card_gen";
            // return response;
            let generateCardResponse = this.parse(response);
            return generateCardResponse;
        });
    }
    parse(generatedData) {
        const cardData = [];
        const usage_data = generatedData.usage_data;
        const created_at = generatedData.created_at;
        const unparsedTestCards = generatedData.generated_content.test_cards;
        for (let elem of unparsedTestCards) {
            if (elem.type == "flash") {
                cardData.push(this.parseFlashCard(elem));
            }
            else if (elem.type == "mcq") {
                cardData.push(this.parseMcqCard(elem));
            }
            else if (elem.type == "cloze") {
                cardData.push(this.parseClozeCard(elem));
            }
            else if (elem.type == "match") {
                cardData.push(this.parseMatchCard(elem));
            }
        }
        usage_data["created_at"] = created_at;
        usage_data["type"] = "card_gen";
        return {
            usage_data: usage_data,
            cards_data: cardData,
        };
    }
    parseFlashCard(data) {
        let displayTitle = this.generateFlashCardDisplayTitle(data.card_content.front, data.card_content.back);
        let flashCardData = {
            type: data.type,
            heading: data.card_reference,
            displayTitle: displayTitle,
            content: {
                front_content: data.card_content.front,
                back_content: data.card_content.back,
            },
            concepts: data.concepts,
            facts: data.facts,
        };
        return flashCardData;
    }
    generateFlashCardDisplayTitle(front, back) {
        return `${front} ---- ${back}`;
    }
    parseMcqCard(data) {
        let mcqAnswers = [];
        for (let choice of data.card_content.choices) {
            let answer = {
                answer: choice.choice,
                is_correct: choice.is_correct,
            };
            mcqAnswers.push(answer);
        }
        let displayTitle = this.generateMcqCardDisplayTitle(data.card_content.prompt, mcqAnswers);
        let mcqCard = {
            type: data.type,
            heading: data.card_reference,
            displayTitle: displayTitle,
            content: {
                question: data.card_content.prompt,
                answers: mcqAnswers,
            },
            concepts: data.concepts,
            facts: data.facts,
        };
        return mcqCard;
    }
    generateMcqCardDisplayTitle(question, answers) {
        let answersString = [];
        for (let option of answers) {
            let currentIndex = answers.indexOf(option) + 1;
            let temp = `${currentIndex} . ${option.answer} `;
            answersString.push(temp);
        }
        let resultString = answersString.join("");
        let finalDisplayTitle = `${question} ---- ${resultString}`;
        return finalDisplayTitle;
    }
    parseClozeCard(data) {
        let displayTitle = this.generateClozeCardDisplayTitle(data.card_content.text, data.card_content.options);
        let clozeCardData = {
            type: data.type,
            heading: data.card_reference,
            displayTitle: displayTitle,
            content: {
                question: data.card_content.text,
                options: data.card_content.options,
            },
            concepts: data.concepts,
            facts: data.facts,
        };
        return clozeCardData;
    }
    generateClozeCardDisplayTitle(question, answers) {
        let optionsString = answers
            .map((item) => item.option)
            .join(", ");
        return `${question} ---- ${optionsString}`;
    }
    parseMatchCard(cardData) {
        let data = cardData.card_content;
        let map = new Map();
        let displayTitle = this.generateMatchCardDisplayTitle(data);
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let value = data[key].replace(/[\[\]]/g, '');
                let items = value.split(',').map((item) => item.trim());
                map.set(key, items);
            }
        }
        let matchCard = {
            type: cardData.type,
            heading: cardData.card_reference,
            content: JSON.stringify(map),
            // content: cardData.card_content,
            displayTitle: displayTitle,
            concepts: data.concepts,
            facts: data.facts,
        };
        return matchCard;
    }
    generateMatchCardDisplayTitle(answers) {
        let titles = [];
        let counter = 65;
        for (let key in answers) {
            if (answers.hasOwnProperty(key)) {
                let value = answers[key].replace(/[\[\]]/g, '');
                let items = value.split(',').map((item) => item.trim());
                items.forEach((item) => {
                    let letter = String.fromCharCode(counter);
                    titles.push(`${letter}. ${key} -- ${item}`);
                    counter++;
                });
            }
        }
        let displayTitle = titles.join(',');
        return displayTitle;
    }
}
exports.GenerateCards = GenerateCards;

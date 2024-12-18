"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseMatchCard = void 0;
class ParseMatchCard {
    constructor() {
        this._parseMatchContent = (input) => {
            const grouped = input.reduce((acc, { left_item, right_item }) => {
                if (!acc[left_item]) {
                    acc[left_item] = { left_item, right_item: [] };
                }
                acc[left_item].right_item.push(right_item);
                return acc;
            }, {});
            return Object.values(grouped);
        };
    }
    parse(cardData) {
        try {
            let content = cardData.card_content;
            const finalContent = this._parseMatchContent(content);
            let displayTitle = this._generateMatchCardDisplayTitle(content);
            let matchCard = {
                type: {
                    category: "learning",
                    sub_type: cardData.type,
                },
                heading: cardData.card_content.card_reference,
                content: finalContent,
                //  content: cardData.card_content,
                displayTitle: displayTitle,
                concepts: cardData.concepts,
                facts: cardData.facts,
                bloomLevel: cardData.bloom_level,
            };
            return this._validateMatch(matchCard);
        }
        catch (e) {
            return null;
        }
    }
    _generateMatchCardDisplayTitle(answers) {
        let titles = [];
        let counter = 65;
        for (let data of answers) {
            let value = data.right_item;
            let leftData = data.left_item;
            let letter = String.fromCharCode(counter);
            titles.push(`${letter}. ${leftData} -- ${value}`);
            counter++;
        }
        let displayTitle = titles.join(",");
        return displayTitle;
    }
    _validateMatch(matchCard) {
        let matches = matchCard.content;
        try {
            // for(let elem of matches){
            //     if(elem.left_item.length > 30 || elem.left_item.length == 0){
            //         throw Error("Invalid Length of left item ");
            //     }else if(elem.right_item[0].length>30 || elem.right_item[0].length == 0){
            //         throw Error(" Invalid Length of right item")
            //     }
            // }
            return matchCard;
        }
        catch (e) {
            return null;
        }
    }
}
exports.ParseMatchCard = ParseMatchCard;

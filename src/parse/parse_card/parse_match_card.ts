import { match } from "assert";

export class ParseMatchCard {
  parse(cardData: any) {
    try {
      let content = cardData.card_content;

      let displayTitle = this._generateMatchCardDisplayTitle(content);
      let matchCard = {
        type: {
          category: "learning",
          sub_type: cardData.type,
        },
        heading: cardData.card_reference,
        content: content,
        //  content: cardData.card_content,
        displayTitle: displayTitle,
        concepts: cardData.concepts,
        facts: cardData.facts,
        bloomLevel: cardData.bloom_level,
      };

      return this._validateMatch(matchCard);
    } catch (e) {
      return null;
    }
  }

  _generateMatchCardDisplayTitle(answers: any) {
    let titles: string[] = [];
    let counter = 65;
    for (let data of answers) {
      let value = data.right_item.join(",");
      let leftData = data.left_item;
      let letter = String.fromCharCode(counter);
      titles.push(`${letter}. ${leftData} -- ${value}`);
      counter++;
    }
    let displayTitle = titles.join(",");
    return displayTitle;
  }

  _validateMatch(matchCard: any){
    let matches = matchCard.content;
    try{
        for(let elem of matches){
            if(elem.left_item.length > 24 || elem.left_item.length == 0){
                throw Error("Invalid Length of left item ");
            }else if(elem.right_item[0].length>24 || elem.right_item[0].length == 0){
                throw Error(" Invalid Length of right item")
            }

        }
        return matchCard;
    }catch(e){
        return null;
    }
  }
}

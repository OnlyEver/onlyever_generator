function isEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }


export function gapFilling(typologyResponse: any, cardgenResponse : any) {
    let allConcepts: string[] = [];
    let allFacts: string[] = [];
    let generatedConceptsList: string[] = [];
    let generatedFactsList: string[] = [];
    let remainingConcepts: string[] = [];
    let remainingFacts: string[] = [];
    if (!isEmpty(typologyResponse)) {
      allConcepts.push(...(typologyResponse.concepts ?? []));
      allFacts.push(...(typologyResponse?.facts ?? []));
    }

    if (!isEmpty(cardgenResponse)) {
      allConcepts.push(...(cardgenResponse.missing_concepts ?? []));
      allFacts.push(...(cardgenResponse.missing_facts ?? []));
    }

    if(cardgenResponse.cards_data !== undefined && cardgenResponse.cards_data.length != 0) {
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
  
      remainingConcepts = allConcepts.filter(
        (item) => !generatedConceptsSet.includes(item)
      );
       remainingFacts = allFacts.filter(
        (item) => !generatedFactsSet.includes(item)
      );
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
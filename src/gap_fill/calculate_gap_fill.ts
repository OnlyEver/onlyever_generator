function isEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }


export function gapFilling(typologyResponse: any, cardgenResponse : any) {
    let allConcepts: string[] = [];
    let allFacts: string[] = [];
    let generatedConceptsList: string[] = [];
    let generatedFactsList: string[] = [];
    if (!isEmpty(typologyResponse)) {
      allConcepts.push(...(typologyResponse.concepts ?? []));
      allFacts.push(...(typologyResponse?.facts ?? []));
    }

    if (!isEmpty(cardgenResponse)) {
      allConcepts.push(...(cardgenResponse.missing_concepts ?? []));
      allFacts.push(...(cardgenResponse.missing_facts ?? []));
    }

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

    let remainingConcepts: string[] = allConcepts.filter(
      (item) => !generatedConceptsSet.includes(item)
    );
    let remainingFacts: string[] = allFacts.filter(
      (item) => !generatedFactsSet.includes(item)
    );

    return {
      //   allConcepts: allConcepts,
      //   allFacts: allFacts,
      //   generatedConcepts: generatedConceptsSet,
      //   generatedFacts: generatedFactsSet,
      remainingConcepts: remainingConcepts,
      remainingFacts: remainingFacts,
    };
  }
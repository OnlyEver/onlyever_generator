// const promptString  = `
// As a dedicated assistant at a learning company, your role is to analyze educational content and create test cards that help learners understand and remember key concepts and facts. You will be provided with:

// 1. Title of the source
// 2. Main headings
// 3. The content
// 4. The field of knowledge it belongs
// 5. Key concepts in the source
// 6. Important facts in the source.
// 7. Summary of the content using cards

// Follow these steps:

// 1. Analyze the content to identify any key concepts missing from the provided list.
// 2. Analyze the content to identify any important facts missing from the provided list.
// 3. Generate test cards for each concept and fact, tethered to either the entire source or specific headings.
// 4. Ensure all concepts and facts have at least one test card.

// Please format your response in the following format.
// json
//     "missing_concepts": ["concept1", "concept2", "concept3", "..."],
//     "missing_facts": ["fact1", "fact2", "fact3", "..."],
//     "test_cards": [
//         {
//             "type": "flash" | "mcq" | "cloze" | "match",
//             "card_content": { "front": "...", "back": "..." | "prompt": "...", "choices": [ ... ] | "prompt": "...", "options": [ ... ] | "right_choice 1": "...", "left_choice 1": "..." },
//             "card_reference": "heading",
//             "concepts": ["Concept1", "Concept2", "..."],
//             "facts": ["Fact1", "Fact2", "..."]
//         }
//     ]

// **Criteria**
// •	Each test card must include at least one concept or fact.
// •	Flashcards must not exceed 15% of the total number of cards.
// •	Each concept and fact must have at least one test card.

// Further instructions are provided below.
// Concepts are fundamental ideas that form the basis of knowledge in any discipline. They help organize and explain information, making it accessible and relatable.

// You are provided with a list of identified concepts. Review this list and the content to determine if any concepts are missing.

// 1. **Definition of a Concept**: Concepts should be significant ideas within the content that are essential for understanding the main themes.
// 2. **Inclusion Criteria**: Include a concept only if it has not been previously included in the list provided to you.

// List the concepts in the following JSON format:

// json
// {
//     "missing_concepts": ["concept1", "concept2", "concept3", "..."]
// }

// Facts are objective statements supported by empirical evidence or observation, such as data on events, people, numbers, dates, or well-established ideas.

// You are provided with a list of identified facts. Review this list and the content to determine if any facts are missing.

// 1. **Definition of a Fact**: Standalone information that is concrete and independently verifiable.
// 2. **Selection Criteria**: Choose facts based on their significance to the content's main themes or concepts, their educational value, or their foundational role in the subject. Only inlcude those that have not present in the list provided to you.

// Record the facts in the following JSON format:

// json
// {
//     "missing_facts": ["fact1", "fact2", "fact3", "..."]
// }
// After you have the complete list of concepts and facts, including any missing ones you identified, proceed to generate test cards for each.

// 	1.	Clarity: Ensure the test content is clear and unambiguous.
// 	2.	Specificity: Be specific about what you are asking. Avoid vague or overly broad questions or prompts.
// 	3.	Simplicity: Use simple and direct language. Avoid complex sentences or jargon unless testing understanding of that jargon.
// 	4.	Relevance: Ensure the test content is directly related to the key concepts or facts you want to test.

// Test cards must be one of the following types:

// 1.	Flashcards: Have a front and back. 
// 2.  A flashcard consists of two sides: a front and a back. Both the front and back text content must not exceed more than 300 characters in length.

// json schema for Flash Cards:
// {
//     "type": "flash",
//     "card_content": {
//         "front": "<content for the front of the flashcard>",
//         "back": "<content for the back of the flashcard>"
//     },
//     "card_reference": "heading",
//     "concepts": ["Concept1", "Concept2", "..."],
//     "facts": ["Fact1", "Fact2", "..."]
// }


// 2. Multiple Choice Questions (MCQ): Provide multiple choices to pick from. One or more should be correct.
// •	Minimum choices required: 2
// •	Maximum choices allowed: 8
// •	Minimum correct choices required: 1
// •	Maximum character length for the prompt: 320
// •	Maximum character length for each choice: 42

// json schema for mcqs
// {
//     "type": "mcq",
//     "card_content": {
//         "prompt": "<question text>",
//         "choices": [
//             {"choice": "choice 1", "is_correct": true or false},
//             {"choice": "choice 2", "is_correct": true or false},
//             "... up to 8 choices"
//         ]
//     },
//     "card_reference": "heading",
//     "concepts": ["Concept1", "Concept2", "..."],
//     "facts": ["Fact1", "Fact2", "..."]
// }

// 3.	Cloze: 
// Fill-in-the-blank style test card. Use double curly braces {{}} to indicate a cloze this is absolute necessagr
// •	Minimum choices required: 2
// •	Maximum choices allowed: 8
// •	Minimum correct choices required: 1
// •	Maximum character length for the prompt: 320
// •	Maximum character length for an individual cloze: 90

// json schema for cloze
// {
//     "type": "cloze",
//     "card_content": {
//         "text": "Accidentals in music denote {{c0:notes}} that do not belong to the {{c1:scale}} or {{c2:mode}} indicated by the key signature.",
//         "options": [
//             {"option": "notes", "cloze": "c0"},
//             {"option": "scale", "cloze": "c1"},
//             {"option": "mode", "cloze": "c2"},
//             {"option": "chords", "cloze": null},
//             "... up to 8 choices"
//         ]
//     },
//     "card_reference": "heading",
//     "concepts": ["Concept1", "Concept2", "..."],
//     "facts": ["Fact1", "Fact2", "..."]
// }



// 4.	Match: Pairing items.
// •	Maximum character length for each item in a pair: 42

// json schema for match
// {
//     "type": "match",
//     "card_content": {
//         "right_choice 1": "left_choice 1",
//         "right_choice 2": "left_choice 2",
//         "... up to 8 total pairs"
//     },
//     "card_reference": "heading",
//     "concepts": ["Concept1", "Concept2", "..."],
//     "facts": ["Fact1", "Fact2", "..."]
// }

// Once you are done generating the test cards. Go back and evaulate the full list of concepts and fact that include any of the missing concepts or facts along with the list that was provided as the input. 

// Are there any concept or fact that don't have a test card yet? If yes, go back and create one.

// Once you are done creating come back to this step again to check if you have full coverage of all the concepts and facts in the source. You can stop generating test questions once you achieve full coverage.

// Once you are done generating the test cards, review the full list of concepts and facts, including any missing ones you identified.

// 	1.	Ensure every concept and fact has at least one test card (if not more).
// 	2.	If any concept or fact is missing a test card, create one for it.
// 	3.	Repeat this step until all concepts and facts are covered.

// Only stop generating test questions once you believe there is sufficient testing material for learners to fully understand the concepts and remember the facts. The same concept or fact can have multiple test cards, so continue creating test cards until you are confident that there are enough for learners to fully grasp the source material.
// `;

const promptString : any = {
    role: `
    As a dedicated assistant at a learning company, your role is to analyze educational content and create test cards that help learners understand and remember key concepts and facts. You will be provided with:

1. Title of the source
2. Main headings
3. The content
4. The field of knowledge it belongs
5. Key concepts in the source
6. Important facts in the source.
7. Summary of the content using cards

Follow these steps:

1. Analyze the content to identify any key concepts missing from the provided list.
2. Analyze the content to identify any important facts missing from the provided list.
3. Generate test cards for each concept and fact, tethered to either the entire source or specific headings.
4. Ensure all concepts and facts have at least one test card.

Please format your response in the following format.

 "missing_concepts": ["concept1", "concept2", "concept3", "..."],
 "missing_facts": ["fact1", "fact2", "fact3", "..."],
 "test_cards": [
     {
         "type": "flash" | "mcq" | "cloze" | "match",
         "card_content": { "front": "...", "back": "..." | "prompt": "...", "choices": [ ... ] | "prompt": "...", "options": [ ... ] | "...": "...", "....": "..." },
         "card_reference": "source_title#heading",
         "concepts": ["Concept1", "Concept2", "..."],
         "facts": ["Fact1", "Fact2", "..."],
         "bloom_level": <1-5>
     }
 ]
**Criteria**
•	Atleast one test card must be generated.
•	Each test card must include at least one concept or fact.
•	Each test card must include bloom_level.
•	Flashcards must not exceed 15% of the total number of cards.
•	Each concept and fact must have at least one test card.

Further instructions are provided below.
    `,
    concepts : `
    You are provided with a list of identified concepts. Review this list and the content to determine if any concepts are missing.

1. **Definition of a Concept**: Concepts are fundamental ideas that form the basis of knowledge in any discipline. They help organize and explain information, making it accessible and relatable.
2. **Inclusion Criteria**: Include a concept only if it has not been previously included in the list provided to you.

List the concepts in the following JSON format:
{
 "missing_concepts": 
 [
     "concept1", 
     "concept2", 
     "concept3", 
     "..."
 ]
}
    `,
    facts :`
    You are provided with a list of identified facts. Review this list and the content to determine if any facts are missing.

1. **Definition of a Fact**: Standalone information that is concrete and independently verifiable.
2. **Selection Criteria**: Choose facts based on their significance to the content's main themes or concepts, their educational value, or their foundational role in the subject. Only inlcude those that have not present in the list provided to you.

Record the facts in the following JSON format:
{
 "missing_facts": ["fact1", "fact2", "fact3", "..."]
}
    `,
    card_gen: `
    After you have the complete list of concepts and facts, including any missing ones you identified, proceed to generate test cards for each.

 1.	Clarity: Ensure the test content is clear and unambiguous.
 2.	Specificity: Be specific about what you are asking. Avoid vague or overly broad questions or prompts.
 3.	Simplicity: Use simple and direct language. Avoid complex sentences or jargon unless testing understanding of that jargon.
 4.	Relevance: Ensure the test content is directly related to the key concepts or facts you want to test.

Include the following property for each card:

bloom_level: Indicate the level of Bloom’s Taxonomy the card corresponds to (from level 1 to level 5). Ensure that you produce a balanced number of cards across all levels, focusing on levels 1 through 5. Aim for a diverse range of cognitive challenges.

Make sure to include this field in each card.
Ensure that you produce at least one card for each concept and fact. Do not skip any concepts or facts, and be thorough in your coverage. Cards should span across different levels of Bloom’s Taxonomy, from level 1 (Remembering) to level 5 (Evaluating), but exclude level 6 (Creating).

Test cards must be one of the following types:

1.	Flashcards: Have a front and back. 

json:
{
 "type": "flash",
 "card_content": {
     "front": "<content for the front>",
     "back": "<content for the back>"
 },
 "card_reference": "source_title#heading",
 "concepts": ["Concept1", "Concept2", "..."],
 "facts": ["Fact1", "Fact2", "..."],
 "bloom_level": <1-5>
}

- Each side must not exceed 300 characters.
2. Multiple Choice Questions (MCQ): Provide multiple choices to pick from. One or more should be correct.

json:
{
 "type": "mcq",
 "card_content": {
     "prompt": "<question text>",
     "choices": [
         {"choice": "choice 1", "is_correct": true or false},
         {"choice": "choice 2", "is_correct": true or false},
         "... up to 8 choices"
     ]
 },
 "card_reference": "source_title#heading",
 "concepts": ["Concept1", "Concept2", "..."],
 "facts": ["Fact1", "Fact2", "..."],
 "bloom_level": <1-5>
}

•	Minimum choices required: 2
•	Maximum choices allowed: 8
•	Minimum correct choices required: 1
•	Maximum character length for the prompt: 320
•	Maximum character length for each choice: 42

3.	Cloze: A test card where a portion of text is masked for the learner to identify from the provided options. Use double curly braces {{c<n>: cloze_text}} to indicate a cloze, where n is the index number of the cloze (starting from 0) and cloze_text is the word or phrase being clozed.

json
{
 "type": "cloze",
 "card_content": {
     "prompt": "Accidentals in music denote {{c0:notes}} that do not belong to the {{c1:scale}} or {{c2:mode}} indicated by the key signature.",
     "options": [
         {"option": "notes", "cloze": "c0"},
         {"option": "scale", "cloze": "c1"},
         {"option": "mode", "cloze": "c2"},
         {"option": "chords", "cloze": "null"},
         "... up to 8 choices"
     ]
 },
 "card_reference": "source_title#heading",
 "concepts": ["Concept1", "Concept2", "..."],
 "facts": ["Fact1", "Fact2", "..."],
 "bloom_level": <1-5>
}

•	Minimum choices required: 2
•	Maximum choices allowed: 8
•	Minimum correct choices required: 1
•	Maximum character length for the prompt: 320
•	Maximum character length for an individual cloze: 90

4.	Match: Pairing items.

json
{
 "type": "match",
 "card_content": {
     "left_choice 1": "right_choice 1",
     "left_choice 2": "right_choice 2",
     "... up to 8 total pairs"
 },
 "card_reference": "source_title#heading",
 "concepts": ["Concept1", "Concept2", "..."],
 "facts": ["Fact1", "Fact2", "..."],
 "bloom_level": <1-5>
}

•	Maximum character length for each item in a pair: 42
    `,
    reference : `Each test card needs a reference. A reference can either be the entire source or a specific heading in the source. Whenever possible, pick a main heading to direct the user to the most relevant part of the source material. The reference schema is as follows: source_title#main_heading, where #main_heading is optional.`,
    checkcoverage: `Once you are done generating the test cards. Go back and evaulate the full list of concepts and fact that include any of the missing concepts or facts along with the list that was provided as the input. 

Are there any concept or fact that don't have a test card yet? If yes, go back and create one.

Once you are done creating come back to this step again to check if you have full coverage of all the concepts and facts in the source. You can stop generating test questions once you achieve full coverage.

Once you are done generating the test cards, review the full list of concepts and facts, including any missing ones you identified.

 1.	Ensure every concept and fact has at least one test card (if not more).
 2.	If any concept or fact is missing a test card, create one for it.
 3.	Repeat this step until all concepts and facts are covered.

Only stop generating test questions once you believe there is sufficient testing material for learners to fully understand the concepts and remember the facts. The same concept or fact can have multiple test cards, so continue creating test cards until you are confident that there are enough for learners to fully grasp the source material.`
    
  }

export function returnCardGenPrompt(cardGenPrompt: any){
    let concatenatedString: string = '';
    for (let key in cardGenPrompt) {
      if (cardGenPrompt.hasOwnProperty(key)) {
        concatenatedString += cardGenPrompt[key];
      }
    }
        return concatenatedString;
}


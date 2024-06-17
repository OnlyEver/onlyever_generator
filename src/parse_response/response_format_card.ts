const responseData  = {
    "flash_cards": [
      {
        "question": "What is the primary function of the 'Electrolysis'?",
        "answer": "Electrolysis is the passing of a direct electric current through an electrolyte producing chemical reactions at the electrodes and decomposition of the materials.",
        "heading": "Overview"
      },
      {
        "question": "What did Michael Faraday discover while studying the process of electrolysis under Humphry Davy?",
        "answer": "Michael Faraday discovered two laws of electrolysis.",
        "heading": "History"
      },
      {
        "question": "What can electrolysis be used for in the manufacturing sector?",
        "answer": "Electrolysis can be used for electroplating and electrochemical machining.",
        "heading": "Manufacturing processes"
      },
      {
        "question": "In the context of electrolysis, what does the term 'Decomposition potential' refer to?",
        "answer": "Decomposition potential or decomposition voltage refers to the minimum voltage between anode and cathode of an electrolytic cell needed for electrolysis to occur.",
        "heading": "Decomposition potential"
      }
    ],
    "mcqs": [
      {
        "question": "What is the primary purpose of 'Electrometallurgy'?",
        "answers": [
          {
            "answer": "Production of aluminium",
            "is_correct": true
          },
          {
            "answer": "Chlorine production",
            "is_correct": false
          },
          {
            "answer": "Purifying copper",
            "is_correct": false
          },
          {
            "answer": "Rust removal",
            "is_correct": false
          },
          {
            "answer": "Hydrogen production",
            "is_correct": false
          }
        ],
        "heading": "Industrial uses"
      },
      {
        "question": "What can electrolysis be used for in the context of batteries?",
        "answers": [
          {
            "answer": "Spontaneous redox reactions",
            "is_correct": true
          },
          {
            "answer": "Energy-releasing reactions",
            "is_correct": false
          },
          {
            "answer": "Disinfectant production",
            "is_correct": false
          },
          {
            "answer": "Fuel production",
            "is_correct": false
          },
          {
            "answer": "Gas diffusion in reactors",
            "is_correct": false
          }
        ],
        "heading": "Related processes"
      }
    ],
    "cloze_cards": [
      {
        "question": "Electrolysis is the passing of a {{c0:direct electric current}} through an {{c1:electrolyte}} producing {{c2:chemical reactions}} at the {{c3:electrodes}} and {{c4:decomposition}} of the materials.",
        "options": [
          {
            "option": "direct electric current",
            "cloze": "c0"
          },
          {
            "option": "electrolyte",
            "cloze": "c1"
          },
          {
            "option": "chemical reactions",
            "cloze": "c2"
          },
          {
            "option": "electrodes",
            "cloze": "c3"
          },
          {
            "option": "decomposition",
            "cloze": "c4"
          },
          {
            "option": "metallic objects",
            "cloze": null
          }
        ]
      },
      {
        "question": "In electrolysis, the decomposition potential or decomposition voltage refers to the minimum voltage between {{c0:anode}} and {{c1:cathode}} of an electrolytic cell needed for electrolysis to occur.",
        "options": [
          {
            "option": "anode",
            "cloze": "c0"
          },
          {
            "option": "cathode",
            "cloze": "c1"
          },
          {
            "option": "electrolyte",
            "cloze": null
          },
          {
            "option": "chemical reactions",
            "cloze": null
          },
          {
            "option": "oxygen",
            "cloze": null
          },
          {
            "option": "hydrogen",
            "cloze": null
          }
        ]
      }
    ]
  };


  export function returnResponse(){
    return responseData;
  }

  export function parseResponse(){
    let cardData = [];
    let data = returnResponse();
    let keys = Object.keys(data);
    if(keys){
        for(let elem of keys){
            if(elem == 'flash_cards'){
              cardData.push(...parseFlashCard(data.flash_cards))
            }else if(elem == 'cloze_cards'){
               cardData.push(...parseClozeCards(data.cloze_cards))
            }else if(elem == 'mcqs'){
                 cardData.push(...parseMcq(data.mcqs))
            }
        }
    }
    return cardData;
  }
  /// takes array of 
  function parseFlashCard(cards: Array<any>){
    let flashCardData = [];
    for(let elem of cards){
        flashCardData.push({
            "type":"flash",
            "heading": elem.heading,
            "content": JSON.stringify({
                "front_content": elem.question,
                "back_content": elem.answer
            })
        });
    }
    return flashCardData;

  }

    /// takes array of 
    function parseMcq(cardsData: Array<any>){
        let mcqCards= [];
        for(let elem of cardsData){
            mcqCards.push({
                "type":"mcq",
                "heading": elem.heading,
                "content": JSON.stringify({
                    "question": elem.question,
                    "answers": elem.answers
                })
            });
        }
        return mcqCards;
    
      }

          /// takes array of 
    function parseClozeCards(cardsData: Array<any>){
        let clozeCards= [];
        for(let elem of cardsData){
            clozeCards.push({
                "type":"cloze",
                "heading": elem.heading,
                "content": JSON.stringify({
                    "question": elem.question,
                    "options": elem.options
                })
            });
        }
        return clozeCards;
    
      }
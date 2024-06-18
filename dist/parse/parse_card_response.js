"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseCardResponse = void 0;
const cardResponse = {
    "status_code": 200,
    "usage_data": {
        "prompt_tokens": 9781,
        "completion_tokens": 1915,
        "total_tokens": 11696
    },
    "generated_content": {
        "missing_concepts": [
            "Faraday's laws of electrolysis",
            "Humphry Davy",
            "Electrolytic cell",
            "Decomposition potential",
            "Oxidation",
            "Reduction",
            "Electrolysis of seawater",
            "Electrometallurgy",
            "Electroplating",
            "Electrochemical machining",
            "Electrochemistry",
            "Electrocatalysis",
            "Electrorefining",
            "Electrolysis of carbon dioxide",
            "Energy changes during electrolysis",
            "Electrocrystallization",
            "Electrolysis of Iron Ore"
        ],
        "missing_facts": [
            "Michael Faraday introduced the term 'electrolysis' in 1834",
            "The first demonstration of key electrolysis concepts was by William Nicholson and Anthony Carlisle in the early nineteenth century",
            "Humphry Davy discovered several alkali and alkaline earth metals by electrolysis",
            "Electrolysis played a key role in isolating and identifying new elements like lithium, chlorine, and fluorine",
            "The Hall–Héroult process led to a significant drop in the price of aluminum",
            "Hydrogen and oxygen are produced in a 2:1 ratio by the electrolysis of water",
            "The electrolysis of seawater can result in the production of alkali hydroxides",
            "Electrometallurgy is used in the production of various metals",
            "Electroplating involves the deposition of a thin metal film onto a substrate material",
            "Electrochemical machining is used for deburring or etching metal surfaces",
            "Electrocatalysis involves the acceleration of electrochemical reactions",
            "Electrorefining is used to obtain pure metals from impure ones",
            "The electrolysis of carbon dioxide can produce methane, ethylene, or ethanol",
            "Energy changes during electrolysis involve the addition of electrical energy, equal to the change in Gibbs free energy plus system losses",
            "Electrocrystallization is a method for obtaining conductive crystals using electrolysis",
            "Electrolysis of Iron Ore can eventually result in the reduction of emissions from steel production"
        ],
        "test_cards": [
            {
                "type": "flash",
                "card_content": {
                    "front": "Who introduced the term 'electrolysis' and in which year?",
                    "back": "Michael Faraday introduced the term 'electrolysis' in 1834"
                },
                "card_reference": "Electrolysis#Etymology",
                "concepts": [],
                "facts": [
                    "Michael Faraday introduced the term 'electrolysis' in 1834"
                ]
            },
            {
                "type": "flash",
                "card_content": {
                    "front": "What was the significance of the Hall–Héroult process?",
                    "back": "The Hall–Héroult process led to a significant drop in the price of aluminum"
                },
                "card_reference": "Electrolysis#Industrial uses",
                "concepts": [
                    "Hall–Héroult process"
                ],
                "facts": [
                    "The Hall–Héroult process led to a significant drop in the price of aluminum"
                ]
            },
            {
                "type": "mcq",
                "card_content": {
                    "prompt": "What does the electrolysis of water produce?",
                    "choices": [
                        {
                            "choice": "Oxygen and carbon dioxide",
                            "is_correct": false
                        },
                        {
                            "choice": "Hydrogen and oxygen",
                            "is_correct": true
                        },
                        {
                            "choice": "Nitrogen and helium",
                            "is_correct": false
                        }
                    ]
                },
                "card_reference": "Electrolysis#Process of electrolysis",
                "concepts": [
                    "Electrometallurgy"
                ],
                "facts": [
                    "Hydrogen and oxygen are produced in a 2:1 ratio by the electrolysis of water"
                ]
            },
            {
                "type": "cloze",
                "card_content": {
                    "prompt": "Electrolysis is the passing of a direct electric current through an {{c0:electrolyte}} producing chemical reactions at the electrodes and decomposition of the materials.",
                    "options": [
                        {
                            "option": "electrolyte",
                            "cloze": "c0"
                        },
                        {
                            "option": "anode",
                            "cloze": "null"
                        },
                        {
                            "option": "cathode",
                            "cloze": "null"
                        }
                    ]
                },
                "card_reference": "Electrolysis#Overview",
                "concepts": [],
                "facts": []
            },
            {
                "type": "match",
                "card_content": {
                    "right_choice 1": "Electrometallurgy",
                    "right_choice 2": "Electroplating",
                    "right_choice 3": "Electrochemical machining",
                    "right_choice 4": "Electrochemistry",
                    "right_choice 5": "Electrocatalysis",
                    "right_choice 6": "Electrorefining",
                    "right_choice 7": "Electrolysis of carbon dioxide",
                    "right_choice 8": "Energy changes during electrolysis",
                    "Electrometallurgy": "The process of producing metals using electricity",
                    "Electroplating": "Deposition of thin metal film onto a substrate material",
                    "Electrochemical machining": "Deburring or etching metal surfaces",
                    "Electrochemistry": "Study of the interchange of chemical and electrical energy",
                    "Electrocatalysis": "Acceleration of electrochemical reactions",
                    "Electrorefining": "Obtaining pure metals from impure ones"
                },
                "card_reference": "Electrolysis#Industrial uses",
                "concepts": [
                    "Electrometallurgy",
                    "Electroplating",
                    "Electrochemical machining",
                    "Electrochemistry",
                    "Electrocatalysis",
                    "Electrorefining",
                    "Electrolysis of carbon dioxide",
                    "Energy changes during electrolysis"
                ],
                "facts": [
                    "Electrometallurgy is used in the production of various metals",
                    "Electroplating involves the deposition of a thin metal film onto a substrate material",
                    "Electrochemical machining is used for deburring or etching metal surfaces",
                    "Electrochemistry is the study of the interchange of chemical and electrical energy",
                    "Electrocatalysis involves the acceleration of electrochemical reactions",
                    "Electrorefining is used to obtain pure metals from impure ones",
                    "The electrolysis of carbon dioxide can produce methane, ethylene, or ethanol",
                    "Energy changes during electrolysis involve the addition of electrical energy, equal to the change in Gibbs free energy plus system losses"
                ]
            },
            {
                "type": "mcq",
                "card_content": {
                    "prompt": "What is a key application of electrolysis?",
                    "choices": [
                        {
                            "choice": "Production of metal from ore",
                            "is_correct": false
                        },
                        {
                            "choice": "Pulsing current results",
                            "is_correct": false
                        },
                        {
                            "choice": "Generating electrical potential",
                            "is_correct": false
                        },
                        {
                            "choice": "Production of chlorine and sodium hydroxide",
                            "is_correct": true
                        }
                    ]
                },
                "card_reference": "Electrolysis#Industrial uses",
                "concepts": [
                    "Electrochemistry",
                    "Electrocatalysis",
                    "Electrorefining"
                ],
                "facts": [
                    "Production of chlorine and sodium hydroxide, called the Chloralkali process"
                ]
            },
            {
                "type": "cloze",
                "card_content": {
                    "prompt": "Oxidation of ions or neutral molecules occurs at the {{c0:anode}}. Reduction of ions or neutral molecules occurs at the {{c1:cathode}}.",
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
                            "cloze": "null"
                        }
                    ]
                },
                "card_reference": "Electrolysis#Oxidation and reduction at the electrodes",
                "concepts": [
                    "Oxidation",
                    "Reduction"
                ],
                "facts": []
            },
            {
                "type": "match",
                "card_content": {
                    "right_choice 1": "Electrolysis",
                    "right_choice 2": "Electrocrystallization",
                    "right_choice 3": "Electrolysis of Iron Ore",
                    "right_choice 4": "Electrolysis of seawater",
                    "right_choice 5": "Electrometallurgy"
                },
                "card_reference": "Electrolysis#Research trends",
                "concepts": [
                    "Electrolysis",
                    "Electrocrystallization",
                    "Electrolysis of Iron Ore",
                    "Electrolysis of seawater",
                    "Electrometallurgy"
                ],
                "facts": []
            }
        ]
    },
    "generated_at": 1718625081,
    "type": "card_gen"
};
class ParseCardResponse {
    constructor(generatedData) {
        this.generatedData = generatedData;
    }
    parse() {
        const cardData = [];
        const usage_data = this.generatedData.usage_data;
        const created_at = this.generatedData.created_at;
        const unparsedTestCards = this.generatedData.test_cards;
        for (let elem of unparsedTestCards) {
            if (elem.type == 'flash') {
                cardData.push(this.parseFlashCard(elem));
            }
            else if (elem.type == 'mcq') {
                cardData.push(this.parseFlashCard(elem));
            }
            else if (elem.type == 'cloze') {
                cardData.push(this.parseClozeCard(elem));
            }
            else if (elem.type == 'match') {
                cardData.push(this.parseMatchCard(elem));
            }
        }
        usage_data['created_at'] = created_at;
        usage_data['type'] = 'card_gen';
        return {
            'usage_data': usage_data,
            'cards_data': cardData
        };
    }
    parseFlashCard(data) {
    }
    parseMcqCard(data) {
    }
    parseClozeCard(data) {
    }
    parseMatchCard(data) {
    }
}
exports.ParseCardResponse = ParseCardResponse;

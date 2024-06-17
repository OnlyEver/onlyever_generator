"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnTypologyData = void 0;
const typologyResponse = {
    "usage_data": {
        "prompt_tokens": 11611,
        "completion_tokens": 441,
        "total_tokens": 12052
    },
    "generated_content": {
        "field": [
            "Sciences",
            "Technology & Engineering",
            "Education, Learning & Personal Development"
        ],
        "concepts": [
            "Electrolysis",
            "Faraday's Laws of Electrolysis",
            "Electrolytic Cell",
            "Decomposition Potential",
            "Oxidation and Reduction at the Electrodes",
            "Electrolysis of Water",
            "Electrolysis of Carbon Dioxide",
            "Electrocrystallization"
        ],
        "facts": [
            "Electrolysis is the passing of a direct electric current through an electrolyte producing chemical reactions at the electrodes and decomposition of the materials.",
            "In electrolysis, the quantity of the products is proportional to the current, and when two or more electrolytic cells are connected in series to the same power source, the products produced in the cells are proportional to their equivalent weight.",
            "The main components required to achieve electrolysis are an electrolyte, electrodes, and an external power source.",
            "Faraday's laws of electrolysis detail the amount of the products of electrolysis is related to the number of electrons in the reaction at the electrodes.",
            "Decomposition potential or decomposition voltage refers to the minimum voltage between anode and cathode of an electrolytic cell that is needed for electrolysis to occur.",
            "The electrochemical reduction of carbon dioxide can produce value-added chemicals such as methane, ethylene, and ethanol."
        ],
        "generate_cards": true,
        "summary_cards": [
            "Electrolysis is the process of passing direct electric current through an electrolyte, resulting in chemical reactions and the decomposition of materials.",
            "Faraday's laws of electrolysis determine the relationship between the amounts of products generated and the electrons involved in the reaction at the electrodes.",
            "Decomposition potential is the minimum voltage required between anode and cathode for electrolysis to occur.",
            "The electrochemical reduction of carbon dioxide is a potential method for producing valuable chemicals such as methane, ethylene, and ethanol."
        ]
    },
    "generated_at": "Tue, 20 Jan 1970 21:17:46 GMT"
};
function returnTypologyData() {
    return typologyResponse;
}
exports.returnTypologyData = returnTypologyData;

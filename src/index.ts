// import express from "express";
// import {
//   returnSourceData,
// } from "./constants/source_data";
// import config from "./config";
// const app = express();
// const port = 3000;

import { OnlyEverGenerator } from "./bootstrap/app";
// import { returnPromptData } from "./constants/prompt_data";

/// While Publishing the package , and using this code as a separate npm module
/// uncomment the below line and comment all the others, expect the import of OnlyEverGenerator
  export {OnlyEverGenerator};

//. All the Codes Below uses express and are strictly for development purpose, while publishing the package, comment everything
//below this line
// let oeGen = new OnlyEverGenerator(config.openAIKey, "gpt-3.5-turbo-1106", {
//   prompt: returnPromptData(),
//   content: returnSourceData(),
// });
// app.get("/", async (req, res) => {
//   // let data = oeGen.returnParsedContent();
//   // let parsedData = parseResponse()
//   let cardPrompt = "";

//   res.send(cardPrompt);
// });

// app.get("/openAI", async (req, res) => {
//   // let prompt = returnPromt();
//   // let prompt = returnCardGenPrompt();
//   //   let content = returnSourceData().toString()
//   //   let headings = returnHeadings();
//   //   // let aiRequest = await openAIRequest(prompt,content);
//   //   let aiRequest = await oeGen.generateCard(prompt,content, false);
//   //  res.send(aiRequest);
// });

// app.get("/typology", async (req, res) => {
//   {
//     // let typologyPrompt = returnTypologyPrompt();
//     // let cardPrompt = returnCardGenPrompt();
//     // let args = new GenerateArgs(
//     //   true,
//     //   true,
//     //   false,
//     //    {
//     //     typology_prompt: typologyPrompt,
//     //     card_gen_prompt: cardPrompt,
//     //     summary_prompt: "",
//     //   }
//     // )
//     let typologyRequest = await oeGen.generate(false, true);
//     res.send(typologyRequest);
//   }
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

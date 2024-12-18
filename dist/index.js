"use strict";
// import express from "express";
// import {
//   returnCardResponse,
//   returnHeadings,
//   returnSourceData,
// } from "./constants/source_data";
// import config from "./config";
// const app = express();
// const port = 3000;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlyEverGenerator = void 0;
const app_1 = require("./bootstrap/app");
Object.defineProperty(exports, "OnlyEverGenerator", { enumerable: true, get: function () { return app_1.OnlyEverGenerator; } });
//. All the Codes Below uses express and are strictly for development purpose, while publishing the package, comment everything
//below this line
// let oeGen = new OnlyEverGenerator(config.openAIKey, "gpt-4o", {
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
//     let aiRequest = await oeGen.generate(true,true);
//    res.send(aiRequest);
// });
// app.get("/parseCardData", async(req,res)=>{
//   let cardResp = returnCardResponse();
//   let headings = returnHeadings();
//   cardResp.metadata = {
//     "req_time": cardResp.generated_at ?? new Date(),
//     "req_type": "card",
//     "req_tokens": cardResp.usage_data?.prompt_tokens,
//     "res_tokens": cardResp.usage_data?.completion_tokens,
//     "model": '40-mini'
// };
//   let parsedData = new ParseCardResponse().parse(cardResp,false);
//   res.send(parsedData)
// });
// // app.get("/typology", async (req, res) => {
// //   {
// //     let typologyPrompt = returnTypologyPrompt();
// //     let cardPrompt = returnCardGenPrompt();
// //     let args = new GenerateArgs(
// //       true,
// //       true,
// //       false,
// //        {
// //         typology_prompt: typologyPrompt,
// //         card_gen_prompt: cardPrompt,
// //         summary_prompt: "",
// //       }
// //     )
// //     let typologyRequest = await oeGen.generate(false, true);
// //     res.send(typologyRequest);
// //   }
// // });
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

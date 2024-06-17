This is a NPM package that handles the all the ai generation for _source on OnlyEver.
The Generation includes, Knowledge Taxonomy , Summary and Test Cards data for the _source.

The class [OnlyEverGenerator] is the Entry point for the generation module it has two required fields, 
[api_key] which is open ai token 
[model] open ai model : 'gpt-3.5-turbo-1106'
[content] source content : Array<BaseBlocks>

The [OnlyEverGenerator] currently exposes a main method, [generate] which handles all types of generation and takes a Param 
```
GenerateArgs : 
For Eg: 
let oeGenerator = new OnlyEverGenerator(
    api_key,
    model,
    [Block1,Block2,Block3], // oe content model
);
    let args = new GenerateArgs(
       true,
       true,
       false,
        {
         typology_prompt: typologyPrompt, 
         card_gen_prompt: cardPrompt,
         summary_prompt: summary prompt,
       }
    )

let responsesArray = await oeGenerator.generate(args);


```

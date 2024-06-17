This is a NPM package that handles the all the ai generation for _source on OnlyEver.
The Generation includes, Knowledge Taxonomy , Summary and Test Cards data for the _source.

The class [OnlyEverGenerator] is the Entry point for the generation module it has two required fields, 
[api_key] which is open ai token 
[model] open ai model : 'gpt-3.5-turbo-1106'
[content] source content : Array<BaseBlocks>

The [OnlyEverGenerator] currently exposes a main method, [generate] which handles all types of generation and takes a Param 
```
generate(generate_typology = false,generate_card = false) method takes two args, generate_typology and generate_cards, which are both boolean.
For Eg: 
let oeGenerator = new OnlyEverGenerator(
    api_key,
    model,
    [Block1,Block2,Block3], // oe content model
);
 

let responsesArray = await oeGenerator.generate(true,true);


```

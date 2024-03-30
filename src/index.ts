import { Tokenizer } from "./tokenizer"

const jsonString  = '{ "key" : "value", "number": 9, "booleanTrue": true, "booleanFalse": false}';


const tokenizer = new Tokenizer(jsonString);

console.log(tokenizer.tokenize());
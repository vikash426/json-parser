import { JsonParser } from "./parser";
import { Tokenizer } from "./tokenizer"

const jsonString  = '{ "key" : "value", "number": 90}';


const tokenizer = new Tokenizer(jsonString);
const parser = new JsonParser(tokenizer.tokenize())


console.log(parser.parse());
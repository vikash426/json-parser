import { parse } from "./parser";
import { tokenize } from "./tokenizer";

const jsonString  = '{ "key" : "value", "number": 90}';



const tokens = tokenize(jsonString);
const ob = parse(tokens)


console.log(ob);
import { jsonParse } from "./parser";
import { tokenize } from "./tokenizer";

const jsonString  = '{ "key" : "value", "number": 90}';



const ob = jsonParse(jsonString)


console.log(ob);
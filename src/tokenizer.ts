import { Token, TokenType } from "./types";
import { isDigit, isWordChar } from "./utils";

export class Tokenizer {
  private pos = 0;
  private jsonString: string;

  constructor(jsonString: string) {
    this.jsonString = jsonString;
  }

  public tokenize(): Token[] {
    const tokens: Token[] = [];

    while (this.pos < this.jsonString.length) {
      const currentChar = this.jsonString.charAt(this.pos);

      if (currentChar === " ") {
        this.pos++;
        continue;
      }

      if (currentChar === "{") {
        tokens.push({ type: TokenType.OPEN_BRACE, value: currentChar });
        this.pos++;
        continue;
      }

      if (currentChar === "}") {
        tokens.push({ type: TokenType.CLOSE_BRACE, value: currentChar });
        this.pos++;
        continue;
      }

      if (currentChar === ":") {
        tokens.push({ type: TokenType.COLON, value: currentChar });
        this.pos++;
        continue;
      }

      if (currentChar === '"') {
        const str = this.consumeString();
        tokens.push({ type: TokenType.STRING, value: str });
        continue;
      }

      if (currentChar === ",") {
        tokens.push({ type: TokenType.COMMA, value: currentChar });
        this.pos++;
        continue;
      }

      if (isDigit(currentChar)) {
        const numb = this.consumeNumber();
        tokens.push({ type: TokenType.NUMBER, value: numb });
        continue;
      }

      if (currentChar === "t") {
        const str = this.consumeValue("true");
        tokens.push({ type: TokenType.TRUE, value: str });
        continue;
      }

      if (currentChar === "f") {
        const str = this.consumeValue("false");
        tokens.push({ type: TokenType.FALSE, value: str });
        continue;
      }

      throw new Error(`unexpected string ${currentChar} at pos ` + this.pos);
    }

    return tokens;
  }

  private consumeString(): string {
    let value = "";
    let currentChar = this.jsonString[++this.pos];
    while (currentChar != '"' && currentChar != null) {
      value = value + currentChar;
      currentChar = this.jsonString[++this.pos];
    }
    this.pos++;
    return value;
  }

  private consumeNumber = (): string => {
    let value = this.jsonString[this.pos];
    let currentChar = this.jsonString[++this.pos];
    while (isDigit(currentChar)) {
      value = value + currentChar;
      currentChar = currentChar[++this.pos];
    }
    this.pos++;
    return value;
  };

  private consumeValue = (value: string): string => {
    let returnValue = "";
    let currentChar = this.jsonString[this.pos++];
    
    for(const ch of value){
        console.log("currentChar: ", currentChar, " ch:", ch);
        if(currentChar !== ch){
            return returnValue;
        }
        returnValue = returnValue + currentChar
        currentChar = this.jsonString[this.pos++];
    }

    return returnValue
  };
}

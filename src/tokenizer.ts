import { Token, TokenType } from "./types";
import { isDigit, isWordChar } from "./utils";


export const tokenize = (jsonString: string): Token[] => {
  let pos = 0;
  const tokens: Token[] = [];

  function consumeValue(value: string): string {
    let returnValue = "";
    let currentChar = jsonString[pos++];

    for (const ch of value) {
      if (currentChar !== ch) {
        return returnValue;
      }
      returnValue = returnValue + currentChar;
      currentChar = jsonString[pos++];
    }

    return returnValue;
  }

  function consumeString(): string {
    let value = "";
    let currentChar = jsonString[++pos];
    while (currentChar != '"' && currentChar != null) {
      value = value + currentChar;
      currentChar = jsonString[++pos];
    }
    pos++;
    return value;
  }

  function consumeNumber(): string {
    let value = jsonString[pos];
    let currentChar = jsonString[++pos];
    while (isDigit(currentChar)) {
      value = value + currentChar;
      currentChar = currentChar[++pos];
    }
    return value;
  };

  while (pos < jsonString.length) {
    const currentChar = jsonString.charAt(pos);

    if (currentChar === " ") {
      pos++;
      continue;
    }

    if (currentChar === "{") {
      tokens.push({ type: TokenType.OPEN_OBJECT, value: currentChar });
      pos++;
      continue;
    }

    if (currentChar === "}") {
      tokens.push({ type: TokenType.CLOSE_OBJECT, value: currentChar });
      pos++;
      continue;
    }

    if (currentChar === ":") {
      tokens.push({ type: TokenType.COLON, value: currentChar });
      pos++;
      continue;
    }

    if (currentChar === '"') {
      const str = consumeString();
      tokens.push({ type: TokenType.STRING, value: str });
      continue;
    }

    if (currentChar === ",") {
      tokens.push({ type: TokenType.COMMA, value: currentChar });
      pos++;
      continue;
    }

    if (isDigit(currentChar)) {
      const numb = consumeNumber();
      tokens.push({ type: TokenType.NUMBER, value: numb });
      continue;
    }

    if (currentChar === "t") {
      const str = consumeValue("true");
      tokens.push({ type: TokenType.TRUE, value: str });
      continue;
    }

    if (currentChar === "f") {
      const str = consumeValue("false");
      tokens.push({ type: TokenType.FALSE, value: str });
      continue;
    }

    if (currentChar === "n") {
      const str = consumeValue("null");
      tokens.push({ type: TokenType.NULL, value: str });
      continue;
    }

    if (currentChar === "[") {
      tokens.push({ type: TokenType.OPEN_ARRAY, value: currentChar });
      pos++;
      continue;
    }

    if (currentChar === "]") {
      tokens.push({ type: TokenType.CLOSE_ARRAY, value: currentChar });
      pos++;
      continue;
    }

    throw new Error(`unexpected character ${currentChar} at pos ` + pos);
  }

  return tokens;
}
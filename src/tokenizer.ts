import { Token, TokenType } from "./types";
import { isDigit, isWordChar } from "./utils";


export const tokenize = (jsonString: string): Token[] => {
  let pos = 0;
  const tokens: Token[] = [];

  function consumeLiteral(expected: string): string {
    if (jsonString.slice(pos, pos + expected.length) === expected) {
      const tokenValue = expected;
      pos += expected.length;
      return expected;
    } else {
      throw new Error(`Unexpected token at pos ${pos}: expected “${expected}”`);
    }
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
      currentChar = jsonString[++pos];
    }
    return value;
  };

  while (pos < jsonString.length) {
    const currentChar = jsonString.charAt(pos);

    if (currentChar === " " || currentChar === "\n") {
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

    if (isDigit(currentChar) || currentChar === '-') {
      const numb = consumeNumber();
      tokens.push({ type: TokenType.NUMBER, value: numb });
      continue;
    }

    if (currentChar === "t") {
      const str = consumeLiteral("true");
      tokens.push({ type: TokenType.TRUE, value: str });
      continue;
    }

    if (currentChar === "f") {
      const str = consumeLiteral("false");
      tokens.push({ type: TokenType.FALSE, value: str });
      continue;
    }

    if (currentChar === "n") {
      const str = consumeLiteral("null");
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
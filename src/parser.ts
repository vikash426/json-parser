import { tokenize } from "./tokenizer";
import { JsonArray, JsonObject, JsonValue, Token, TokenType } from "./types";


export const jsonParse = (jsonString: string): JsonObject => {
    let pos = 0;
    const tokens = tokenize(jsonString)

    function currentToken(): Token{
        return tokens[pos];
    }

    function nextToken(): Token{
        if(pos+1 >= tokens.length)
            throw new Error("Invalid Json")
        return tokens[++pos];
    }

    function parseValue(): JsonValue{
        const token = currentToken();
        switch(token.type){
            case TokenType.STRING:
                return token.value
            case TokenType.NUMBER:
                return Number.parseFloat(token.value)
            case TokenType.NULL:
                return null
            case TokenType.TRUE:
                return true
            case TokenType.FALSE:
                return false
            case TokenType.OPEN_OBJECT:
                return parseObject()
            case TokenType.OPEN_ARRAY:
                return parseArray()
            default:
                throw new Error(`Unexpected Token ${token.value}`)
        }
    }

    function parseObject(): JsonObject {
        const jsonObject: JsonObject = {}
        assertToken(currentToken().type, TokenType.OPEN_OBJECT)
        let token = nextToken(); // Consume {
        while(token.type !== TokenType.CLOSE_OBJECT){
            assertToken(token.type, TokenType.STRING)
            const key = token.value;
            token = nextToken(); // Consume Key
            assertToken(token.type, TokenType.COLON)
            token = nextToken(); // Consume Colon
            const value = parseValue();
            jsonObject[key] = value;
            console.log("value", value);
            token = nextToken();  // COnsume Value
            if(token.type === TokenType.COMMA){
                token = nextToken();  // Consume ,
            }
        }
        
        return jsonObject
    }

    function parseArray(): JsonArray {
      const jsonArray: JsonArray = [];
      assertToken(currentToken().type, TokenType.OPEN_ARRAY)
      let token = nextToken() //Consume [
      while(token.type !== TokenType.CLOSE_ARRAY){
        jsonArray.push(parseValue())
        token = nextToken();  // COnsume Value
        if(token.type === TokenType.COMMA){
            token = nextToken();  // Consume ,
        }   
      }

      return jsonArray;
    }

    function assertToken(currentTokenType: TokenType,tokenType: TokenType){
        if(currentTokenType !== tokenType){
            throw new Error(`expected token ${tokenType} but got ${currentTokenType}`)
        }
    }


    if(currentToken().type === TokenType.OPEN_ARRAY)
        return parseArray()

    return parseObject()
}

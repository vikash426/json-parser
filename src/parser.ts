import { Tokenizer } from "./tokenizer";
import { JsonObject, JsonValue, Token, TokenType } from "./types";

export class JsonParser{
    private tokens: Token[];
    private pos = 0

    constructor(tokens: Token[]){
        console.log("tokens", tokens);
        this.tokens = tokens;
    }

    currentToken(): Token{
        return this.tokens[this.pos];
    }

    nextToken(): Token{
        if(this.pos+1 >= this.tokens.length)
            throw new Error("Invalid Json")
        return this.tokens[++this.pos];
    }

    parse = (): JsonObject => {
        return this.parseObject()
    }

    parseObject = (): JsonObject => {
        const jsonObject: JsonObject = {}
        this.assertToken(this.currentToken().type, TokenType.OPEN_OBJECT)
        let token = this.nextToken(); // Consume {
        while(token.type !== TokenType.CLOSE_OBJECT){
            this.assertToken(token.type, TokenType.STRING)
            const key = token.value;
            token = this.nextToken(); // Consume Key
            this.assertToken(token.type, TokenType.COLON)
            token = this.nextToken(); // Consume Colon
            const value = this.parseValue();
            jsonObject[key] = value;
            console.log("value", value);
            token = this.nextToken();  // COnsume Value
            if(token.type === TokenType.COMMA){
                token = this.nextToken();  // Consume ,
            }
        }
        
        return jsonObject
    }

    parseValue = (): JsonValue => {
        const token = this.currentToken();
        switch(token.type){
            case TokenType.STRING:
                return token.value
            case TokenType.NUMBER:
                return Number.parseInt(token.value)
            case TokenType.NULL:
                return null
            case TokenType.TRUE:
                return true
            case TokenType.FALSE:
                return false
            default:
                throw new Error(`Unexpected Token ${token.value}`)
        }
    }

    private assertToken(currentTokenType: TokenType,tokenType: TokenType){
        if(currentTokenType !== tokenType){
            throw new Error(`expected token ${tokenType} but got ${currentTokenType}`)
        }
    }
}


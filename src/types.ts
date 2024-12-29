export enum TokenType {
    OPEN_OBJECT = 'OPEN_OBJECT',
    CLOSE_OBJECT = 'CLOSE_OBJECT',
    OPEN_ARRAY = 'OPEN_ARRAY',
    CLOSE_ARRAY = 'CLOSE_ARRAY',
    QUOTES = 'QUOTES',
    STRING = 'STRING', 
    COLON = 'COLON',
    COMMA = 'COMMA',
    NUMBER = 'NUMBER',
    TRUE = 'TRUE',
    FALSE = 'FALSE',
    NULL = 'NULL'
}

export interface Token {
    type: TokenType,
    value: string,
}

export type JsonValue = string | boolean | number | null | JsonArray | JsonObject

export type JsonObject = any

export type JsonArray = JsonValue[]

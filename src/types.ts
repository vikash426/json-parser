export enum TokenType {
    OPEN_BRACE = 'OPEN_BRACE',
    CLOSE_BRACE = 'CLOSE_BRACE',
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
    value: String,
}
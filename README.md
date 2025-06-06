# Json Parser

Building another Json Parser insprired by John Crickett's Coding Challenge: [Build Your Own JSON Parser](https://link-url-here.org)

## Approach
Check out the [Json Documentation](https://www.json.org/json-en.html) to understand grammer and supported types.

### Implmentation
- Lexical Tokenization - return meaningful tokens from text
- Parsing - analyse the list of tokens to match it to json grammar, if it validates convert it into a typescript object
 


### Meaningful Tokens
```
OPEN_OBJECT = {
CLOSE_OBJECT = }
OPEN_ARRAY = [
CLOSE_ARRAY = ]
QUOTES = "
STRING = 'STRING'
COLON = :
COMMA = ,
NUMBER = 'NUMBER'
TRUE = 'TRUE',
FALSE = 'FALSE',
NULL = 'NULL'
```

## TODO
- Extend parser for following types
    - Numbers
        - [x] Positve Integers
        - [ ] Negative Integers
        - [ ] Fractional
        - [ ] Exponential
    - [x] Boolean
    - [x] Null
    - [x] Json Array
    - [ ] Nested Json Object
    - [ ] Escape Sequence in String (\" (escaped quote), \\ (backslash), \uXXXX (Unicode))
    - [ ] Whitesapce - Space, Tab (\t, U+0009), Line Feed (\n, U+000A), Carriage Return (\r, U+000D)





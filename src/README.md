# Json Parser

Building another Json Parser insprired by John Crickett's Coding Challenge: [Build Your Own JSON Parser](https://link-url-here.org)

## Approach
Check out the [Json Documentation](https://www.json.org/json-en.html) to understand grammer and supported types.

### Steps
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
- [x] Tokenizer
- [x] Empty json object parsing
- [x] parse string key and value pair
- Extend parser for following types
    - [x] Numbers
    - [x] Boolean
    - Null
    - Json Array
    - Nested Json Object
- Deserilization to a typescript object
- Write Unit Test





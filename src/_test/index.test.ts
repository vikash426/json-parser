import * as fs from 'fs';
import path from 'path';
import { jsonParse } from '../parser';
import { JsonObject } from '../types';


describe('should pass', () => {

    const dir = path.join(__dirname, 'pass/');

    it('should parse with empty object', () => {
        const jsonString = fs.readFileSync(`${dir}pass0.json`, 'utf-8');
        expect(jsonParse(jsonString)).toBeDefined()
    })


    it('should parse with string value', () => {
        const jsonString = fs.readFileSync(`${dir}pass1.json`, 'utf-8');
        const json = jsonParse(jsonString) as any
        expect(json["Key"]).toBe("Value")
    })

    it('should parse with array and nestes arrays', () => {
        const jsonString = fs.readFileSync(`${dir}pass2.json`, 'utf-8');
        const json = jsonParse(jsonString)
        expect(json[0][0][0][0][0]).toBeDefined()
    })


    it('should parse with nested object', () => {
        const jsonString = fs.readFileSync(`${dir}pass3.json`, 'utf-8');
        const json = jsonParse(jsonString)
        expect(json["Test pass3"]["The outermost value"]).toBe("must be an object or array.")
    })


    it('should parse array of strings', () => {
        const jsonString = fs.readFileSync(`${dir}pass5.json`, 'utf-8');
        const json = jsonParse(jsonString)
        expect(json["array of strings"]["In this test"].length).toBe(4)
    })

    it('should parse array of objects', () => {
        const jsonString = fs.readFileSync(`${dir}pass6.json`, 'utf-8');
        const json = jsonParse(jsonString)
        expect(json["array of objects"]["In this test"].length).toBe(2)
        expect(json["array of objects"]["In this test"][0]["key"]).toBe("value")
    })


    it('should parse integers', () => {
        const jsonString = fs.readFileSync(`${dir}pass7.json`, 'utf-8');
        const json = jsonParse(jsonString)
        expect(json["integer"]).toBe(1234567890)
        expect(json["neg-integer"]).toBe(-42)
    })

})
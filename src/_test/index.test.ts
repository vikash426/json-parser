import * as fs from 'fs';
import path from 'path';
import { jsonParse } from '../parser';


describe('should pass', () => {

    const dir = path.join(__dirname, 'pass/');
    const files = fs.readdirSync(dir);

    files.forEach((file: string) => {
        it(`${file} test`, () => {
            try{
            const jsonString = fs.readFileSync(`${dir}${file}`, 'utf-8');
            expect(jsonParse(jsonString)).toBeDefined()
            } catch(e){
                console.log("----e", e)
                throw e
            }
        })
    })

    

})
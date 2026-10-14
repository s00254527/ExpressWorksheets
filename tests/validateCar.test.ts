import { carSchemaZSchema } from "../src/models/cars";

//creating a new carmodel thats "valid"
const  validCar = {
    "make":"Una",
    "model": "0871234567",
    "year":1980
}

//so from what I gather Im passing the car test data that has to 
//be validated into this. 
describe('Test Car Validation',() =>{

    it('should pass for the following data',() =>{
        expect(() => carSchemaZSchema.parse(validCar)).not.toThrow();
    });

     it('should pass for the following valid data - no date', () => { 
        expect(() => carSchemaZSchema.parse( 
            { ...validCar, "year": undefined })).not.toThrow(); 
    }); 

    it('should fail for the too early year ', () => { 
        expect(() => carSchemaZSchema.parse( 
            { ...validCar, "year": 1949 })).toThrow(); 
    }); 

    it('should fail for the unparsaable year ', () => { 
        expect(() => carSchemaZSchema.parse( 
            { ...validCar, "year": 'wrong year' })).toThrow(); 
    }); 

    it('should fail for the missing make ', () => { 
        expect(() => carSchemaZSchema.parse( 
            { ...validCar, "make": undefined })).toThrow(); 
    }); 

    it('should fail for the missing make ', () => { 
        expect(() => carSchemaZSchema.parse( 
            { ...validCar, "model": '' })).toThrow(); 
    }); 


});
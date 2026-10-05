import {Schema} from "mongoose";
import {z} from "zod";

//creating an interface for the car model with 3 types 
export interface ICar {
    make:string;
    model:string;
    year:number;
}
//I think this is the schema that constructs the car model in the db. 
//This is just something very simple with a json tbl and a pk

export const CarModel = new Schema<ICar>(
    {
        make: {type:String, required:true},
        model: {type:String, required:true},
        year: {type:Number, required:true}, 
    },
    {timestamps:true}
);
//now ive changed this to ZODD, to help with the validation. 
export const carSchemaZSchema = z.object({
    make: z.string(),
    model: z.string(),
    year: z.number().min(1950).optional(),
});

  


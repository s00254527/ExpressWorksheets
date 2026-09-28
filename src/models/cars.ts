import {Schema,model} from "mongoose";
//creating an interface for the car model with 2 types 
export interface ICar {
    make:string;
    model:string;
}
//I think this is the schema that constructs the car model in the db. 
//This is just something very simple with a json tbl and a pk
const carSchema = new Schema<ICar>(
    {
        make: {type:String, required:true},
        model: {type:String, required:true},
    },
    {timestamps:true}
);
//exporting the model so that it can be used in other files.
export const CarModel = model<ICar>("Car", carSchema);



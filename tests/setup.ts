import { connectDB} from "../src/database/db"; 


beforeAll(async () => { 
    console.log('Run once before tests'); 
   await connectDB(); 
}); 
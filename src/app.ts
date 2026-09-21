import express, {Application, Request, Response} from "express" ; 
import {env} from "./config/env";
// Load the route module at runtime so TypeScript does not include a file outside src in the compilation.
const carRoutes = require('../routes/cars').default;

const PORT = env.port;

const app: Application = express(); 
app.use(express.json());
app.use('/api/v1/cars', carRoutes);

 app.get("/ping", async (_req : Request, res: Response) => { 

    res.json({ 
    message: "We're so passing this module", 
    }); 

}); 

 

app.listen(PORT, () => { 
    console.log("Server is running on port", PORT); 
    }); 
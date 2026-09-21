import express, {Application, Request, Response} from "express" ; 
import {env} from "./config/env";
import { connectDB } from "./database/db";
// Load the route module at runtime so TypeScript does not include a file outside src in the compilation.
//const carRoutes = require('../routes/cars').default;

const PORT = env.port;

const app: Application = express(); 
app.use(express.json());
// app.use('/api/v1/cars', carRoutes);

const startServer = async () => {
  await connectDB();

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

startServer();


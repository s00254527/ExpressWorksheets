import express, {Application, Request, Response} from "express" ; 
import {env} from "./config/env";
import { connectDB } from "./database/db";
import carRoutes from "../src/routes/cars";


const PORT = env.port;

const app: Application = express(); 
app.use(express.json());
app.use('/api/v1/cars', carRoutes);

const startServer = async () => {
  await connectDB();

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();


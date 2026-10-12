import express, {Application} from "express" ; 
import {env} from "./config/env";
import { connectDB } from "./database/db";
import carRoutes from "../src/routes/cars";
import { carSchemaZSchema } from "./models/cars";
import { validate } from "./middleware/auth.middleware";
import { swaggerSpec } from "./config/swagger";
import swaggerUi from "swagger-ui-express";


const PORT = env.port;

//had to change this for the exports and everything elese. 
export const app: Application = express(); 
app.use(express.json());
app.use('/api/v1/cars',validate(carSchemaZSchema), carRoutes);
//importing swagger 
app.use('/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);




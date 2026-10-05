import express, {Application} from "express" ; 
import {env} from "./config/env";
import { connectDB } from "./database/db";
import carRoutes from "../src/routes/cars";
import { carSchemaZSchema } from "./models/cars";
import { validate } from "./middleware/auth.middleware";
import { swaggerSpec } from "./config/swagger";
import swaggerUi from "swagger-ui-express";


const PORT = env.port;

const app: Application = express(); 
app.use(express.json());
app.use('/api/v1/cars',validate(carSchemaZSchema), carRoutes);
//importing swagger 
app.use('/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

//so this is the startring the server. which is intresting connecting to bd. 
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port abcafihiuahwn ${PORT}`);
  });
};

startServer();


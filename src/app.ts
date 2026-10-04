import express, {Application} from "express" ; 
import {env} from "./config/env";
import { connectDB } from "./database/db";
import carRoutes from "../src/routes/cars";
import { authenticateKey } from "./middleware/auth.middleware";


const PORT = env.port;

const app: Application = express(); 
app.use(express.json());

app.use('/api/v1/cars',authenticateKey, carRoutes);


//so this is the startring the server. which is intresting connecting to bd. 
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port abcafihiuahwn ${PORT}`);
  });
};

startServer();


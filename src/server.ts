import { app } from './app' 
import { env } from './config/env'; 
//had to change this as my db folder is by itself for 
//organisiational reasons. 
import { connectDB } from "./database/db"; 

//making sure its using the right port. 
const port = env.port; 
const startServer = async () => { 

  await connectDB(); 
  app.listen(port, (error) => { 
    if (error) { 
      if (error instanceof Error) { 
        console.error("Error starting server:", error.message); 
      } 
      else { 
        console.error("Error starting server:", error); 
      } 
    } 
    else { 
      console.log(`Server running on port ${port}`); 
    } 
  }); 
} 

//removed starting server from app.ts and changed it to here. 
startServer(); 
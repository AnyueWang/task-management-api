import express from "express";
import cors from "cors";
import dotenv from "dotenv";

export async function startServer() {
  dotenv.config();
  const PORT = process.env.PORT || 4000;
  
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Run the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

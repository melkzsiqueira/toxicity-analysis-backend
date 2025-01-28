import express from "express";
import cors from "cors";
import toxicityController from "./controllers/toxicityController";

const app = express();

app.use(express.json());
app.use(cors());
app.post("/analyze-toxicity", toxicityController.analyzeToxicity);

export default app;

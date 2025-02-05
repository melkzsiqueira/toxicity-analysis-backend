import express from "express";
import cors from "cors";
import toxicityController from "./controllers/toxicityController";

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    const start = Date.now(); // Marca o início da requisição

    res.on("finish", () => {
        // Evento chamado quando a resposta é enviada
        const duration = Date.now() - start;
        console.log(
            `Requisição para ${req.method} ${req.url} demorou ${duration}ms`
        );
    });

    next(); // Passa para o próximo middleware ou rota
});
app.post("/analyze-toxicity", toxicityController.analyzeToxicity);

export default app;

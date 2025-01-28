import { Request, Response, RequestHandler } from "express";
import toxicityService from "../services/toxicityService";

class ToxicityController {
    analyzeToxicity: RequestHandler = async (req: Request, res: Response) => {
        const { text } = req.body;

        if (!text || typeof text !== "string") {
            res.status(400).json({
                error: "O texto é obrigatório e deve ser uma string",
            });
            return;
        }

        try {
            const analysisResult = await toxicityService.analyzeText(text);
            res.json(analysisResult);
        } catch (error) {
            console.error("Erro ao analisar texto:", error);
            res.status(500).json({ error: "Falha ao analisar o texto" });
        }
    };
}

export default new ToxicityController();

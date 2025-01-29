import { pipeline, TextClassificationPipeline } from "@xenova/transformers";
import {
    MODEL_NAME,
    MODEL_TASK,
    TOXICITY_THRESHOLD,
} from "../configurations/toxicity-analysis.config";

type ToxicityAnalysisResult = {
    text: string;
    isToxic: boolean;
    probability: number;
    message: string;
};

type ToxicityResult = {
    label: string;
    score: number;
};

class ToxicityService {
    private classifier: TextClassificationPipeline | null = null;

    async initialize() {
        this.classifier = await pipeline(MODEL_TASK, MODEL_NAME);
        console.log("Modelo de toxicidade carregado com sucesso!");
    }

    async analyzeText(text: string): Promise<ToxicityAnalysisResult> {
        if (!this.classifier) {
            throw new Error("Modelo não inicializado");
        }

        const result = await this.classifier(text);
        const toxicityResult = result[0] as ToxicityResult;
        const isToxic =
            toxicityResult.score > TOXICITY_THRESHOLD &&
            toxicityResult.label === "toxic";
        const probability = toxicityResult.score;

        return {
            text,
            isToxic,
            probability,
            message: isToxic
                ? "Texto com alta probabilidade de ser tóxico."
                : "Texto com baixa probabilidade de ser tóxico.",
        };
    }
}

export default new ToxicityService();

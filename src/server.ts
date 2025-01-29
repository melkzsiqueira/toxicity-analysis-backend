import app from "./app";
import toxicityService from "./services/toxicityService";

const port = process.env.PORT || 8080;

toxicityService
    .initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`O servidor está em execução http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Falha ao inicializar o serviço de toxicidade:", error);
        process.exit(1);
    });

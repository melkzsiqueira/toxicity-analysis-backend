import axios from "axios";
import { performance } from "perf_hooks";
import * as fs from "fs";
import * as path from "path";

async function carregarTextos(): Promise<string[]> {
    const filePath = path.resolve(__dirname, "..", "assets", "textos.txt");
    const conteudo = fs.readFileSync(filePath, "utf-8");
    return conteudo
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
}

async function benchmark() {
    const textos = await carregarTextos();
    const url = "http://localhost:3000/analisar";
    const resultados: { tamanho: number; tempo: number }[] = [];

    for (const texto of textos) {
        const tamanho = Buffer.byteLength(texto, "utf-8");
        const inicio = performance.now();
        try {
            await axios.post(url, { texto });
            const fim = performance.now();
            const tempo = fim - inicio;
            resultados.push({ tamanho, tempo });
            console.log(`Texto (${tamanho} bytes): ${tempo.toFixed(2)}ms`);
        } catch (err) {
            console.error(
                `Erro com texto (${tamanho} bytes):`,
                (err as any).message
            );
        }
    }

    const csv = [
        "tamanho_bytes,tempo_ms",
        ...resultados.map((r) => `${r.tamanho},${r.tempo.toFixed(2)}`),
    ].join("\n");
    fs.writeFileSync("benchmark_resultados.csv", csv);
    console.log("Resultados salvos em benchmark_resultados.csv");
}

benchmark();

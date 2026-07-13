// Carrega content/*.json (versionados no repo) pro Vercel Blob store.
// Rodar uma vez após criar o Blob store, ou pra resetar o conteúdo pros
// valores padrão. Precisa de BLOB_READ_WRITE_TOKEN no ambiente (.env.local
// localmente, ou já injetado automaticamente nas Vercel Functions).
import { put } from "@vercel/blob";
import { readFile, readdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, "..", "content");

async function main() {
  const files = (await readdir(contentDir)).filter((f) => f.endsWith(".json"));
  if (files.length === 0) {
    console.error("Nenhum content/*.json encontrado.");
    process.exit(1);
  }
  for (const file of files) {
    const raw = await readFile(path.join(contentDir, file), "utf8");
    JSON.parse(raw); // valida antes de subir
    await put(`content/${file}`, raw, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    console.log(`  seeded content/${file}`);
  }
  console.log(`\n${files.length} arquivos carregados no Blob store.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

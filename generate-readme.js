const fs = require("fs");
const path = require("path");

// 🔹 emojis
const difficultyEmoji = {
  Easy: "🟢 Easy",
  Medium: "🟡 Medium",
  Hard: "🔴 Hard"
};

// 🔹 padrões fixos
const defaultPatterns = {
  "Two Pointers": 0,
  "Sliding Window": 0,
  "Binary Search": 0,
  "Trees (DFS/BFS)": 0,
  "Dynamic Programming": 0,
  "Backtracking": 0,
  "Greedy": 0,
  "Graphs": 0
};

let problems = [];
let difficultyCount = { Easy: 0, Medium: 0, Hard: 0 };
let patternCount = { ...defaultPatterns };

// 🔥 normalizar nomes de pasta → padrão
function normalizeFolderToPattern(folder) {
  const map = {
    "two-pointers": "Two Pointers",
    "sliding-window": "Sliding Window",
    "binary-search": "Binary Search",
    "trees": "Trees (DFS/BFS)",
    "tree": "Trees (DFS/BFS)",
    "dp": "Dynamic Programming",
    "dynamic-programming": "Dynamic Programming",
    "backtracking": "Backtracking",
    "greedy": "Greedy",
    "graphs": "Graphs",
    "graph": "Graphs"
  };

  return map[folder.toLowerCase()] || folder;
}

// 🔥 pegar todos arquivos recursivamente
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);

    if (fs.statSync(fullPath).isDirectory()) {
      // ignorar .git e node_modules
      if (file === ".git" || file === "node_modules") return;
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// 🔥 pegar arquivos de código
const codeFiles = getAllFiles("./").filter(file =>
  file.endsWith(".dart") ||
  file.endsWith(".cpp") ||
  file.endsWith(".js") ||
  file.endsWith(".ts") ||
  file.endsWith(".java")
);

// 🔥 processar arquivos
codeFiles.forEach(file => {
  const content = fs.readFileSync(file, "utf-8");

  const title = content.match(/@title:\s*(.*)/)?.[1];
  const difficulty = content.match(/@difficulty:\s*(.*)/)?.[1];
  const tags = content.match(/@tags:\s*(.*)/)?.[1];
  const link = content.match(/@link:\s*(.*)/)?.[1];

  if (!title || !difficulty) return;

  // 🔥 pegar padrão pela pasta
  const parts = file.split(path.sep);
  const folder = parts[0]; // ex: two-pointers
  const folderPattern = normalizeFolderToPattern(folder);

  const finalTags = tags || folderPattern;

  problems.push({
    title,
    difficulty,
    tags: finalTags,
    link
  });

  // dificuldade
  if (difficultyCount[difficulty] !== undefined) {
    difficultyCount[difficulty]++;
  }

  // padrões
  finalTags.split(",").forEach(tag => {
    const t = tag.trim();
    patternCount[t] = (patternCount[t] || 0) + 1;
  });
});

// ordenar
problems.sort((a, b) => a.title.localeCompare(b.title));

// 📚 tabela problemas
let problemTable =
`## 📚 Problemas Resolvidos

<details>
<summary>📂 Clique para expandir</summary>

| # | Problema | Dificuldade | Padrões | Link |
|--|----------|------------|--------|------|
`;

problems.forEach((p, i) => {
  problemTable += `| ${i + 1} | ${p.title} | ${difficultyEmoji[p.difficulty]} | ${p.tags} | [🔗](${p.link || "#"}) |\n`;
});

problemTable += `\n</details>\n`;

// 🚀 dificuldade
let difficultyTable =
`## 🚀 Progresso por Dificuldade

| Dificuldade | Resolvidos |
|------------|-----------|
`;

for (let d in difficultyCount) {
  difficultyTable += `| ${difficultyEmoji[d]} | ${difficultyCount[d]} |\n`;
}

// 🧩 padrões
let patternTable =
`## 🧩 Progresso por Padrões

| Padrão | Resolvidos |
|--------|-----------|
`;

for (let p in patternCount) {
  patternTable += `| ${p} | ${patternCount[p]} |\n`;
}

// 📊 total
let total =
`## 📊 Progresso Geral
Total resolvidos: ${problems.length} 🚀
`;

// 🧠 README final
const readme =
`# 📘 LeetCode Journey

${total}

---

${difficultyTable}

---

${patternTable}

---

${problemTable}
`;

fs.writeFileSync("README.md", readme);

console.log("README.md atualizado com sucesso 🚀");
const fs = require('fs');

// Ler as 500 originais
const originalKeywords = fs.readFileSync('seo.txt', 'utf-8')
    .split('\n')
    .map(k => k.trim())
    .filter(k => k.length > 0);

// Algumas bases principais para não gerar lixo com palavras muito específicas
const baseKeywords = originalKeywords.slice(0, 50); // pegar as top 50 mais relevantes

const prefixes = [
    "melhor", "comprar", "assinar", "teste", "teste grátis", "baixar", 
    "como instalar", "onde comprar", "lista", "sistema", "aplicativo"
];

const suffixes = [
    "2026", "2025", "grátis", "pago", "premium", "sem travar", "atualizada", 
    "para smart tv", "tv box", "para celular", "brasil", "portugal", 
    "4k", "definitiva", "anti-bloqueio", "oficial", "samsung", "lg"
];

let generated = new Set([...originalKeywords]);

// Gerar long tails e curtas
baseKeywords.forEach(base => {
    // Curtas (Prefix + Base ou Base + Suffix)
    prefixes.forEach(p => generated.add(`${p} ${base}`));
    suffixes.forEach(s => generated.add(`${base} ${s}`));
    
    // Longas (Prefix + Base + Suffix)
    prefixes.forEach(p => {
        suffixes.forEach(s => {
            generated.add(`${p} ${base} ${s}`);
        });
    });
});

const allKeywords = Array.from(generated);

// Salvar no arquivo expandido
fs.writeFileSync('seo_expanded.txt', allKeywords.join('\n'));

// Atualizar o HTML
const keywordString = allKeywords.join(', ');
let html = fs.readFileSync('index.html', 'utf-8');

// Substituir o conteúdo atual do parágrafo de SEO
const regex = /<p style="line-height: 1\.8;">.*?<\/p>/s;
if (regex.test(html)) {
    html = html.replace(regex, `<p style="line-height: 1.8;">${keywordString}</p>`);
    fs.writeFileSync('index.html', html);
    console.log(`Sucesso! Foram geradas e injetadas ${allKeywords.length} palavras-chave (curtas e longas).`);
} else {
    console.log("Não encontrou o bloco de SEO no HTML.");
}

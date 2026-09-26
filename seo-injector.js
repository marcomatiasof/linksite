const fs = require('fs');

const keywordsRaw = fs.readFileSync('seo.txt', 'utf-8');
const keywords = keywordsRaw.split('\n').map(k => k.trim()).filter(k => k.length > 0);
const keywordString = keywords.join(', ');

const htmlPath = 'index.html';
let html = fs.readFileSync(htmlPath, 'utf-8');

// Check if we already injected
if (!html.includes('seo-cloud-container')) {
    const seoHtml = `
        <section class="seo-cloud-container" style="background: var(--bg-color); padding: 2rem 0; border-top: 1px solid var(--border);">
            <div class="container">
                <details style="color: var(--text-muted); font-size: 0.8rem; cursor: pointer;">
                    <summary style="font-weight: 600; margin-bottom: 1rem; outline: none;">Termos Pesquisados Frequentemente (Pesquisas Relacionadas)</summary>
                    <p style="line-height: 1.8;">${keywordString}</p>
                </details>
            </div>
        </section>
    `;

    // Inject just before </main>
    html = html.replace('</main>', seoHtml + '\n    </main>');
    fs.writeFileSync(htmlPath, html);
    console.log('SEO Cloud Injected!');
} else {
    console.log('SEO Cloud already exists.');
}

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://raywinkelman.com';
const today = new Date().toISOString().split('T')[0];

const HREFLANG = `
    <xhtml:link rel="alternate" hreflang="en"        href="${BASE}/"/>
    <xhtml:link rel="alternate" hreflang="es"        href="${BASE}/es/"/>
    <xhtml:link rel="alternate" hreflang="th"        href="${BASE}/th/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/"/>`.trimStart();

const staticPages = [
  { loc: `${BASE}/`,                              hreflang: true,  priority: '1.0' },
  { loc: `${BASE}/es/`,                           hreflang: true,  priority: '0.8' },
  { loc: `${BASE}/th/`,                           hreflang: true,  priority: '0.8' },
  { loc: `${BASE}/americanguntrader/`,            hreflang: false, priority: '0.7' },
  { loc: `${BASE}/dabdash/`,                      hreflang: false, priority: '0.7' },
  { loc: `${BASE}/orderprepped/`,                 hreflang: false, priority: '0.7' },
  { loc: `${BASE}/blog/`,                         hreflang: false, priority: '0.6' },
];

let blogPosts = [];
try {
  const res = await fetch('https://n8n.americanguntrader.com/webhook/491d8b14-ea4f-48b1-bde4-d1136a023a41', {
    headers: { 'x-shadowmen': '508e7579-374c-47ec-9d6d-a024f9a65a89' },
  });
  if (res.ok) {
    const data = await res.json();
    if (Array.isArray(data)) {
      blogPosts = data.map((p) => ({
        loc: `${BASE}/blog/${p.slug}/`,
        lastmod: new Date(p.published_at).toISOString().split('T')[0],
        hreflang: false,
        priority: '0.5',
      }));
    }
  }
} catch (e) {
  console.warn('Could not fetch blog posts for sitemap:', e.message);
}

const allPages = [...staticPages, ...blogPosts];

const urls = allPages.map(({ loc, lastmod, hreflang, priority }) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod ?? today}</lastmod>${hreflang ? `\n    ${HREFLANG}` : ''}
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`).join('');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}
</urlset>
`;

const out = resolve(__dirname, '../public/sitemap.xml');
writeFileSync(out, xml, 'utf8');
console.log(`sitemap.xml written (${staticPages.length} static + ${blogPosts.length} blog URLs, lastmod ${today})`);

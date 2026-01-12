import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the built files from dist
const distDir = resolve(__dirname, 'dist');
const indexPath = resolve(distDir, 'index.html');

if (!existsSync(indexPath)) {
  throw new Error('Build failed: index.html not found in dist/. Run "vite build" first.');
}

let html = readFileSync(indexPath, 'utf8');

// Find JS and CSS files in dist (check both root and assets directory)
const files = readdirSync(distDir);
const assetsDir = resolve(distDir, 'assets');
const hasAssetsDir = existsSync(assetsDir);

let jsFile = null;
let cssFile = null;

if (hasAssetsDir) {
  const assetFiles = readdirSync(assetsDir);
  jsFile = assetFiles.find(f => f.endsWith('.js') && !f.includes('legacy'));
  cssFile = assetFiles.find(f => f.endsWith('.css'));
  if (jsFile) jsFile = `assets/${jsFile}`;
  if (cssFile) cssFile = `assets/${cssFile}`;
} else {
  jsFile = files.find(f => f.endsWith('.js') && !f.includes('legacy'));
  cssFile = files.find(f => f.endsWith('.css'));
}

// Get the base URL from environment variable or use a placeholder
// This should be set to where you'll host the widget files (e.g., GitHub Pages, Vercel, etc.)
const baseUrl = process.env.WIDGET_BASE_URL || 'https://your-widget-domain.com';

// Update script and link tags to use absolute URLs
if (jsFile) {
  // Match script tags with src attributes
  html = html.replace(
    /<script[^>]*src="[^"]*"[^>]*><\/script>/g,
    `<script type="module" crossorigin src="${baseUrl}/${jsFile}"></script>`
  );
}

if (cssFile) {
  // Match link tags with rel="stylesheet"
  html = html.replace(
    /<link[^>]*rel="stylesheet"[^>]*>/g,
    `<link rel="stylesheet" href="${baseUrl}/${cssFile}">`
  );
}

// Write the final widget HTML
const widgetPath = resolve(__dirname, 'dist', 'greetings-widget.html');
writeFileSync(widgetPath, html, 'utf8');

console.log('Widget built successfully:', widgetPath);
console.log(`\n⚠️  IMPORTANT: Make sure to:`);
console.log(`1. Host the files (${jsFile}${cssFile ? `, ${cssFile}` : ''}, greetings-widget.html) at: ${baseUrl}`);
console.log(`2. Set WIDGET_DOMAIN in say_hello/.env to: ${baseUrl}`);
console.log(`3. Set CSP_RESOURCE_DOMAINS in say_hello/.env to: ${baseUrl}`);


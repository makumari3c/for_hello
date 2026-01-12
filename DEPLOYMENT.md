# Deployment Guide for GitHub Pages

This guide explains how to deploy the `for_hello` widget to GitHub Pages.

## Prerequisites

- GitHub account
- Repository with GitHub Pages enabled
- Node.js and npm installed

## Deployment Steps

### 1. Build the Widget

```bash
cd for_hello
npm install
npm run build
```

This will:
- Build the React app with Vite
- Generate `greetings-widget.html` with correct GitHub Pages URLs
- Output files to `dist/` directory

### 2. Deploy to GitHub Pages

#### Option A: Using gh-pages package (Recommended)

```bash
npm install -g gh-pages
npm run deploy
```

Or if you have it as a dev dependency:
```bash
npm run deploy
```

#### Option B: Manual Deployment

1. Copy the contents of `dist/` directory
2. Create a `gh-pages` branch in your repository
3. Push the files to the `gh-pages` branch
4. Enable GitHub Pages in repository settings to use `gh-pages` branch

### 3. Verify Deployment

After deployment, verify these URLs are accessible:

- `https://makumari3c.github.io/for_hello/greetings-widget.html`
- `https://makumari3c.github.io/for_hello/assets/index-Dm56vyV1.js` (or current JS file name)

### 4. Update say_hello Server Configuration

Make sure `say_hello/.env` has:

```bash
WIDGET_DOMAIN=https://makumari3c.github.io/for_hello
CSP_RESOURCE_DOMAINS=https://makumari3c.github.io/for_hello
```

### 5. Restart the Server

```bash
cd ../say_hello
npm start
```

## File Structure on GitHub Pages

Your GitHub Pages should have this structure:

```
https://makumari3c.github.io/for_hello/
├── greetings-widget.html
├── index.html
└── assets/
    └── index-Dm56vyV1.js (or current hash)
```

## Troubleshooting

### Widget not loading?

1. **Check file accessibility:**
   - Open `https://makumari3c.github.io/for_hello/greetings-widget.html` in browser
   - Check browser console for 404 errors

2. **Verify file paths:**
   - The HTML should reference: `https://makumari3c.github.io/for_hello/assets/index-*.js`
   - Make sure the JS file exists at that path

3. **Check GitHub Pages settings:**
   - Repository → Settings → Pages
   - Source should be set to `gh-pages` branch or `main` branch `/root` or `/docs`

4. **Clear browser cache:**
   - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Build issues?

- Make sure `WIDGET_BASE_URL` is set correctly in build script
- Check that `vite.config.js` has `base: '/for_hello/'` for GitHub Pages subdirectory

## Updating After Changes

1. Make changes to React components
2. Run `npm run build`
3. Run `npm run deploy` (or manually push to gh-pages branch)
4. Wait a few minutes for GitHub Pages to update
5. Test the widget in ChatGPT


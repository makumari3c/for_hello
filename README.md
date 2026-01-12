# For Hello - React UI Widgets Library

A React-based UI widgets library for ChatGPT Apps SDK. This directory contains reusable React components that can be used by MCP servers.

## Overview

This directory contains:
- A React-based greetings UI component built with Vite
- Build scripts to generate standalone HTML widgets
- Widgets that can be consumed by MCP servers (like `say_hello` server)

## Project Structure

```
for_hello/
├── src/
│   └── greetings/
│       ├── index.jsx          # React entry point
│       └── Greetings.jsx       # Main greetings component
├── dist/                      # Built files (generated)
│   ├── greetings-widget.html  # Widget HTML (references external JS/CSS)
│   ├── index.js               # Built JavaScript bundle
│   └── index.css              # Built CSS bundle
├── build-widget.mjs           # Build script to create widget HTML
├── vite.config.js             # Vite configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

**Note:** This directory contains only UI widgets. The MCP server that uses these widgets is in the `say_hello/` directory.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the React app:**
   ```bash
   npm run build
   ```
   
   This will:
   - Build the React app with Vite
   - Generate `greetings-widget.html` that references the JS/CSS files via URLs
   - The HTML file will be used by the `say_hello` server

## ⚠️ IMPORTANT: Widget Hosting Requirements

**For the React widget to work in ChatGPT, you MUST host the widget files on a public HTTPS domain.**

### Why?

ChatGPT's Content Security Policy (CSP) blocks inline scripts. The widget HTML references external JS/CSS files that must be accessible from ChatGPT's servers.

### Options for Hosting:

1. **GitHub Pages** (Free, Easy)
   ```bash
   # After building, push dist/ to a gh-pages branch
   git subtree push --prefix for_hello/dist origin gh-pages
   # Your widget will be at: https://yourusername.github.io/repo/greetings-widget.html
   ```

2. **Vercel/Netlify** (Free, Easy)
   - Deploy the `dist/` directory
   - Get a URL like: `https://your-widget.vercel.app`

3. **Your own server**
   - Serve the `dist/` directory via HTTPS
   - Ensure CORS headers are set

### Configuration:

1. **Set the widget base URL when building:**
   ```bash
   WIDGET_BASE_URL=https://your-widget-domain.com npm run build
   ```

2. **Update `say_hello/.env`:**
   ```bash
   WIDGET_DOMAIN=https://your-widget-domain.com
   CSP_RESOURCE_DOMAINS=https://your-widget-domain.com
   ```

3. **Make sure these files are accessible:**
   - `https://your-widget-domain.com/greetings-widget.html`
   - `https://your-widget-domain.com/index.js` (or whatever the built JS file is named)
   - `https://your-widget-domain.com/index.css` (or whatever the built CSS file is named)

## Development

### Running the React app in development mode

```bash
npm run dev
```

This starts the Vite dev server on `http://localhost:3000` where you can preview and develop the React component.

### Building for production

```bash
npm run build
```

This builds the React app and creates the widget HTML file that references external JS/CSS files.

## How It Works

1. The React app is built with Vite and outputs separate `.html`, `.js`, and `.css` files.
2. The `build-widget.mjs` script creates `greetings-widget.html` that references the JS/CSS via URLs.
3. You must host these files on a public HTTPS domain.
4. The `say_hello` MCP server reads the HTML file and serves it as a resource.
5. When the `show_greeting` tool is called, ChatGPT loads the widget HTML, which then loads the JS/CSS from your hosted domain.

## Troubleshooting

### Widget not loading in ChatGPT?

1. **Check that files are accessible:**
   - Open `https://your-widget-domain.com/greetings-widget.html` in a browser
   - Check browser console for 404 errors on JS/CSS files

2. **Verify widget domain matches:**
   - The `WIDGET_DOMAIN` in `say_hello/.env` must match where files are hosted
   - The `CSP_RESOURCE_DOMAINS` must include your widget domain

3. **Check CORS headers:**
   - Your hosting must allow cross-origin requests
   - Add CORS headers if needed

4. **Verify HTTPS:**
   - ChatGPT requires HTTPS for widget domains
   - No HTTP allowed

## Next Steps

- Add more React widgets
- Customize styling and animations
- Add more interactive features
- Deploy to production hosting

## Resources

- [OpenAI Apps SDK Documentation](https://developers.openai.com/apps-sdk/quickstart)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

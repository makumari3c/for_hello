# GitHub Pages Deployment Checklist

## ✅ What's Been Configured

1. **Build Script**: Updated to use `https://makumari3c.github.io/for_hello` as base URL
2. **Vite Config**: Set `base: '/for_hello/'` for GitHub Pages subdirectory
3. **Widget HTML**: Generated with correct absolute URLs
4. **Server Config**: `.env` file created with correct widget domain

## 📋 Files That Must Be on GitHub Pages

Your GitHub Pages repository (`https://makumari3c.github.io/for_hello/`) must contain:

```
for_hello/
├── greetings-widget.html    ✅ REQUIRED - Widget HTML file
├── index.html               (Optional - for testing)
└── assets/
    └── index-Dm56vyV1.js   ✅ REQUIRED - React bundle (filename may vary)
```

## 🔍 Verification Steps

### 1. Check File Accessibility

Test these URLs in your browser:

- ✅ `https://makumari3c.github.io/for_hello/greetings-widget.html` - Should load the HTML
- ✅ `https://makumari3c.github.io/for_hello/assets/index-Dm56vyV1.js` - Should download the JS file

If you get 404 errors:
- Make sure you've pushed the `dist/` folder contents to GitHub
- Check that GitHub Pages is enabled and pointing to the correct branch
- Verify the file paths match exactly (case-sensitive)

### 2. Verify Widget HTML Content

The `greetings-widget.html` file should contain:

```html
<script type="module" crossorigin src="https://makumari3c.github.io/for_hello/assets/index-Dm56vyV1.js"></script>
```

**Important**: The path must be `/for_hello/assets/...` (with the `/for_hello/` prefix) because your GitHub Pages is at `makumari3c.github.io/for_hello/`.

### 3. Check GitHub Pages Settings

1. Go to your repository on GitHub
2. Settings → Pages
3. Source: Should be set to:
   - `gh-pages` branch (if using gh-pages)
   - OR `main` branch with `/root` or `/docs` folder
4. Custom domain: Leave empty (unless you have one)

### 4. Verify Server Configuration

In `say_hello/.env`:

```bash
WIDGET_DOMAIN=https://makumari3c.github.io/for_hello
CSP_RESOURCE_DOMAINS=https://makumari3c.github.io/for_hello
```

**Note**: Remove trailing slashes - use `https://makumari3c.github.io/for_hello` not `https://makumari3c.github.io/for_hello/`

## 🚀 Deployment Commands

```bash
# 1. Build the widget
cd for_hello
npm run build

# 2. Deploy to GitHub Pages
npm run deploy

# OR manually:
# Copy dist/ contents to gh-pages branch and push
```

## ⚠️ Common Issues

### Issue: 404 on JS file

**Cause**: File path mismatch or file not deployed

**Solution**:
- Check the actual JS filename in `dist/assets/`
- Make sure `greetings-widget.html` references the correct filename
- Verify the file exists at the GitHub Pages URL

### Issue: Widget loads but React doesn't render

**Cause**: CSP blocking or module loading issue

**Solution**:
- Check browser console for CSP errors
- Verify `CSP_RESOURCE_DOMAINS` includes your GitHub Pages URL
- Make sure the JS file is served with correct MIME type (`application/javascript`)

### Issue: CORS errors

**Cause**: GitHub Pages should handle CORS automatically, but check if you see errors

**Solution**:
- GitHub Pages serves files with proper CORS headers by default
- If issues persist, check browser console for specific errors

## 📝 Next Steps After Deployment

1. ✅ Verify all files are accessible via URLs
2. ✅ Update `say_hello/.env` with correct domain
3. ✅ Install dotenv: `cd say_hello && npm install`
4. ✅ Restart the server: `npm start`
5. ✅ Test in ChatGPT with the `show_greeting` tool

## 🔗 Quick Links

- Your GitHub Pages: https://makumari3c.github.io/for_hello/
- Widget HTML: https://makumari3c.github.io/for_hello/greetings-widget.html
- JS Bundle: https://makumari3c.github.io/for_hello/assets/index-Dm56vyV1.js (check actual filename)


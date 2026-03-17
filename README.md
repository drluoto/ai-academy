# AI Academy

A Claude Desktop training course: from first prompt to production-ready agent systems. 5 modules, ~90 minutes total.

## Deploy to GitHub Pages

1. Create a new GitHub repository (public or private with GitHub Pages enabled).

2. Push this directory as the repo root:
   ```bash
   cd ai-academy
   git init
   git add .
   git commit -m "Initial deploy"
   git remote add origin git@github.com:YOUR_ORG/ai-academy.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to **Settings > Pages**
   - Source: **Deploy from a branch**
   - Branch: `main`, folder: `/ (root)`
   - Save

4. The site will be available at `https://YOUR_ORG.github.io/ai-academy/` (or your custom domain if configured).

## Structure

```
index.html          Main landing page (course overview)
reveal.html         Module 0 - From Excel to board report
cowork.html         Module 1 - Your first AI colleague
rapport.html        Module 2 - Report with context engineering
automation.html     Module 3 - Plugins, Skills & Connectors
claude-code.html    Module 4 - Claude Code
transformation.html Advisory page
kontakt.html        Contact / next steps
css/                Stylesheets
js/                 JavaScript
files/              Downloadable exercises
screenshots/        Module screenshots
```

## Notes

- All pages are static HTML -- no build step or server required.
- The contact form on `kontakt.html` has no backend configured; it will need a form endpoint if you want submissions to work.

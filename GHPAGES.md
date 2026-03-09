# GitHub Pages setup

This project is ready to be published with **GitHub Pages** (static site, no build step).

## In this repo

- **`.nojekyll`** — Tells GitHub not to run Jekyll so all files are served as-is (recommended for plain HTML/CSS/JS).
- **Root files** — `index.html`, `styles.css`, `main.js` are at the repo root, which is what Pages will serve.

## What you need to do on GitHub

1. Open your repo on GitHub.
2. Go to **Settings** → in the left sidebar, **Pages** (under “Code and automation”).
3. Under **Build and deployment**:
   - **Source:** choose **Deploy from a branch**.
   - **Branch:** select `main` (or `master` if that’s your default).
   - **Folder:** select **/ (root)**.
4. Click **Save**.

After a minute or two, the site will be available at:

`https://<your-username>.github.io/<repo-name>/`

Example: `https://lola.github.io/performance-apply-landing/`

---

**Note:** If you haven’t pushed yet, add and commit the new files, then push:

```bash
git add .nojekyll GHPAGES.md
git commit -m "Add GitHub Pages config"
git push
```

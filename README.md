# ⚙ MotoParts Gallery

**MotoParts Gallery** is a simple React Single-Page Application (SPA) for browsing **photos of motorcycle parts**: engines, brakes, tires and wheels, exhausts, chains, headlights and spark plugs. Users can search, filter by part category, sort, page through results, open an image's details, and save favorites that stay after a page reload.

Made for our Web Systems and Technologies final project.

## 🌐 API used

**Pixabay API**: https://pixabay.com/api/docs/

- Free stock photos; needs a **free API key**
- Search endpoint: `GET https://pixabay.com/api/?key=KEY&q=motorcycle+engine&image_type=photo&page=1&per_page=20`
- Details endpoint: `GET https://pixabay.com/api/?key=KEY&id=IMAGE_ID`
- Limits: 100 requests per minute, max 500 results per search (25 pages of 20)

## ✨ Features

| Requirement | How we did it |
|---|---|
| Search / keyword filter | Search box filters the loaded images by keyword tags or photographer as you type |
| Category filter & sorting | Dropdown for part type (Engine, Brakes, Exhaust…) and sort by most liked / downloaded / viewed |
| Pagination | Prev / Next buttons that load the next page from the API |
| localStorage | ☆ Save images to **Favorites**; they stay after reloading the page |
| Loading state | Spinner while the API is loading |
| Error handling | Red error box with a **Try Again** button |
| Routing (React Router) | `/` Home, `/image/:id` Details, `/favorites` Favorites, plus a 404 page |

## 📁 Project structure

```
src/
├── api.js               # fetch functions (async/await)
├── App.jsx              # routes + favorites (localStorage)
├── main.jsx
├── index.css
├── components/
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── Filters.jsx      # category + sort dropdowns
│   ├── ImageCard.jsx
│   ├── Pagination.jsx
│   ├── Loader.jsx
│   └── ErrorMessage.jsx
└── pages/
    ├── Home.jsx
    ├── Details.jsx
    └── Favorites.jsx
```

## 🚀 Setup & installation

You need **Node.js 20 or newer**.

```bash
git clone https://github.com/<your-username>/motoparts-gallery.git
cd motoparts-gallery
npm install
npm run dev
```

Open http://localhost:5173

Other commands: `npm run build` (production build) and `npm run lint` (check code).

## 🔑 Environment variables

The app needs a free Pixabay API key.

1. Create a free account at https://pixabay.com and log in.
2. Open https://pixabay.com/api/docs/. Your key is shown near the top of the page.
3. In the project folder (the **same folder as `package.json`**), copy `.env.example` and rename the copy to `.env`.
4. Paste your key:
   ```env
   VITE_PIXABAY_KEY=12345678-abcdef1234567890
   ```
5. Save the file, stop the server (**Ctrl + C**), and run `npm run dev` again.

Notes:
- The name must start with `VITE_`, or Vite won't load it.
- `.env` is in `.gitignore`, so your key is **never pushed to GitHub**. Only `.env.example` is.
- If the key is missing, the app shows a message explaining these steps.

## 🌿 Git workflow

We never commit directly to `main`. Each feature has its own branch and is merged through a Pull Request.

| Branch | Owner | What it adds |
|---|---|---|
| `feature/setup` | Member 2 | React Router, App, Header, CSS |
| `feature/api-fetch` | Member 1 | `api.js`, Home page fetch, Loader, ErrorMessage |
| `feature/search-bar` | Member 2 | SearchBar + live filtering |
| `feature/filter-sort` | Member 1 | Filters (category + sort) |
| `feature/pagination` | Member 2 | Pagination |
| `feature/details-page` | Member 1 | `/image/:id` Details page |
| `feature/favorites` | Member 2 | Favorites page + localStorage |
| `docs/readme` | Both | README |

Steps for each feature:

```bash
git checkout main
git pull
git checkout -b feature/search-bar
# ...make changes...
git add .
git commit -m "feat: add search bar to filter images"
git push -u origin feature/search-bar
# On GitHub: open a Pull Request -> partner reviews -> Merge
```

Commit prefixes: `feat:` new feature, `fix:` bug fix, `style:` design/CSS, `docs:` README.

## 👥 Team contributions

| Member | Contributions |
|---|---|
| **_Your Name_** | API fetching (`api.js`), loading & error handling, category filter & sorting, Details page |
| **_Partner's Name_** | Project setup & routing, Header, search bar, pagination, Favorites with localStorage, CSS design |

## 📷 Image credits

All images come from [Pixabay](https://pixabay.com) and are free to use under the Pixabay Content License. The photographer is shown on each card and details page, with a link back to Pixabay.

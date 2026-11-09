# Nima Yushij Library

A simple, dependency-free website for a center preserving Persian books and documents.

## Included

- English (`en/`), French (`fr/`) and Farsi (`fa/`), with right-to-left Persian layout.
- Home, Collection, History, and a separate **Yade Yaran / یاد یاران** memorial page.
- No list of the 43 founders. The history mentions collective founding only.
- Searchable catalogue and optional document links; memorial portraits and biographies.
- No invented people, catalogue records, founding dates, addresses, or contact details.
- No tracking, accounts, backend, build step, external fonts, or required dependencies.

## Publish on GitHub Pages

1. Unzip this package. Upload the **contents** of `nima-yushij-library/` to the root of your GitHub repository. `index.html`, `en/`, `fr/`, `fa/`, `assets/`, `data/` and `.nojekyll` must be at the repository root.
2. In the repository, open **Settings → Pages**. Choose deployment from a branch, then `main` and `/ (root)` (or the branch you use).
3. Use the Pages address GitHub provides. All asset and page paths are relative, so repository subpaths work.
4. To use your domain, enter the exact domain in the Pages custom-domain field and configure its DNS using GitHub's current custom-domain instructions. Enable HTTPS when available. The domain was not supplied in this request, so no guessed `CNAME` or DNS records are included.

The root currently opens English. To open Persian first, change `en/index.html` to `fa/index.html` in the root `index.html` meta-refresh tag only. Keep the language fallback links.

## Preview

Open `index.html` directly, or run `python3 -m http.server 8000` from this directory and open `http://localhost:8000`. The catalogue uses local JavaScript data rather than fetch, so it also works directly from disk.

## Add books and documents

Edit `data/catalogue.js`, replacing the empty array with records. Example structure (replace every example value with real information):

```js
window.NIMA_CATALOGUE = [
  {
    id: "book-001",
    type: "book", // "book" or "document"
    title: { fa: "عنوان فارسی", en: "English title", fr: "Titre français" },
    author: { fa: "نام نویسنده", en: "Author", fr: "Auteur" },
    year: "",
    description: { fa: "توضیح", en: "Description", fr: "Description" },
    subjects: ["ادبیات", "literature", "littérature"],
    image: "../assets/covers/book-001.jpg",
    url: "../assets/documents/document-001.pdf"
  }
];
```

`image`, `url`, `year`, and `description` are optional. Paths are relative to language pages, so shared assets begin with `../assets/`. Put files inside the matching assets subfolders. A document link can also be an HTTPS URL. Only add files you are authorized to distribute. Physical books do not need a download link. The catalogue is a public descriptive list; this package does not create a borrowing or inventory-management system.

## Add Yade Yaran tributes

Edit `data/memorials.js`:

```js
window.NIMA_MEMORIALS = [
  {
    id: "friend-001",
    name: { fa: "نام فرد", en: "Name", fr: "Nom" },
    photo: "../assets/memorials/friend-001.jpg",
    dates: { fa: "", en: "", fr: "" },
    biography: { fa: "متن یادبود", en: "Tribute", fr: "Hommage" }
  }
];
```

Add approved photographs to `assets/memorials/`. Dates and photographs are optional. Only actual tributes appear; the empty state is shown until records are provided. Translated fields can also be plain strings. Missing translations fall back to Farsi, then English, then French. Content is rendered as text, not HTML.

## Edit text and appearance

Edit each language's HTML files for page content. Edit `assets/style.css` for colors and layout. The complete history should be added to the three `history.html` files when available. Contact details and opening hours can be added once confirmed. The site is static: edit files and commit to GitHub to update it.

## Checks performed

All 13 HTML pages were parsed; local page, stylesheet, script, icon and language links were verified. JavaScript syntax and representative catalogue filtering/memorial rendering were checked. The package includes no hosting credentials or previous Sites deployment configuration.

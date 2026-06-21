# 🛒 Affiliate Store — Next.js + Vercel

A fast, beautiful affiliate product listing page. Add products to a CSV file and deploy to Vercel in minutes.

---

## ✨ Features

- **CSV-driven**: Edit `public/products.csv` to add/update products — no code changes needed
- **Category filter + Search**: Visitors can browse and search products instantly
- **Dark mode design**: Clean, modern UI optimised for conversions
- **SEO ready**: Static generation, proper meta tags, `rel="sponsored"` on affiliate links
- **Mobile responsive**: Looks great on all screen sizes
- **Fast**: Statically generated at build time — no database, no API calls at runtime

---

## 📁 Project Structure

```
sr-smart-finds/
├── public/
│   └── products.csv          ← ADD YOUR PRODUCTS HERE
├── src/
│   ├── app/
│   │   ├── layout.tsx        ← Site metadata (edit title/description here)
│   │   ├── page.tsx          ← Main page (reads CSV, renders grid)
│   │   └── globals.css       ← Global styles & colour tokens
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── ProductGrid.tsx   ← Search + filter + grid logic
│   │   └── ProductCard.tsx   ← Individual product card
│   └── lib/
│       └── parseProducts.ts  ← CSV parser utility
├── next.config.js
└── package.json
```

---

## 📊 Connect Your Google Sheet

This is the recommended way to manage products — no code changes needed after setup.

### Step 1: Create your Google Sheet

Use these exact column headers in row 1:
```
name  |  price  |  image  |  affiliate_link  |  category  |  description
```

### Step 2: Publish the sheet as CSV

1. Open your Google Sheet
2. Go to **File → Share → Publish to web**
3. Set the dropdowns to **"Sheet1"** and **"Comma-separated values (.csv)"**
4. Click **Publish** → copy the URL

The URL looks like:
```
https://docs.google.com/spreadsheets/d/XXXXXXXXXXXX/pub?output=csv
```

### Step 3: Paste the URL into the code

Open `src/app/page.tsx` and replace the placeholder:
```ts
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/...";
```

### How updates work

Once deployed, Vercel re-fetches your sheet every **60 seconds** (ISR).  
So editing the sheet → live on your site within ~1 minute. No redeployment needed!

---



Edit `public/products.csv`. Required columns (order matters):

| Column         | Description                                      | Example                          |
|----------------|--------------------------------------------------|----------------------------------|
| `name`         | Product name                                     | boAt Rockerz 450 Headphones      |
| `price`        | Price (numbers only, ₹ added automatically)      | 1499                             |
| `image`        | Full image URL (https://...)                     | https://m.media-amazon.com/...   |
| `affiliate_link` | Your affiliate URL                             | https://amzn.to/xxxxx           |
| `category`     | Category label for filtering                     | Electronics                      |
| `description`  | Short product description (1–2 sentences)        | Great headphones with...         |

**Tips:**
- Wrap fields containing commas in double quotes: `"name with, comma"`
- Image URL: Use Amazon product images or upload to Cloudinary/ImgBB
- Leave `description` blank if not needed (column must still exist)

---

## 🚀 Deploy to Vercel (Step-by-Step)

### Step 1: Push to GitHub

```bash
# From inside the project folder:
git init
git add .
git commit -m "Initial affiliate store"

# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Select your GitHub repo
4. Vercel auto-detects Next.js — click **"Deploy"**
5. Done! Your site is live in ~2 minutes 🎉

### Step 3: Update products

To add new products:
1. Edit `public/products.csv` on your computer
2. Commit and push to GitHub:
   ```bash
   git add public/products.csv
   git commit -m "Add new products"
   git push
   ```
3. Vercel auto-deploys the updated site in ~1 minute

---

## 🛠 Run Locally

```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## 🎨 Customisation

| What to change         | Where                                      |
|------------------------|--------------------------------------------|
| Site name & tagline    | `src/components/Header.tsx`                |
| Meta title/description | `src/app/layout.tsx`                       |
| Brand colours          | `src/app/globals.css` (CSS variables)      |
| Footer text            | `src/components/Footer.tsx`                |
| Products               | `public/products.csv`                      |

---

## 📝 Legal Note

Always include an affiliate disclosure on your site. The Footer already contains one — edit it to match your affiliate program requirements (Amazon Associates, etc.).

---

## 🔧 Built With

- [Next.js 14](https://nextjs.org/) — React framework
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules) — Scoped styles
- [Vercel](https://vercel.com) — Hosting & deployment

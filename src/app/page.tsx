import { parseCSV } from "@/lib/parseProducts";
import ProductGrid from "@/components/ProductGrid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─────────────────────────────────────────────────────────────
// 👇 PASTE YOUR GOOGLE SHEET'S PUBLISHED CSV URL HERE
//
// How to get this URL:
//   1. Open your Google Sheet
//   2. File → Share → Publish to web
//   3. Choose "Comma-separated values (.csv)" and click Publish
//   4. Copy the URL and replace the placeholder below
// ─────────────────────────────────────────────────────────────
const GOOGLE_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1CTJxtOtnvrMmhqOtAfdk8iXWcrlkvXt7ZipU4Qym0wQ/export?format=csv&gid=0";

// Vercel ISR: re-fetch the sheet and rebuild the page every 60 seconds
// so updates to your sheet go live within ~1 minute without a manual redeploy
export const revalidate = 60;

async function getProducts() {
  try {
    const res = await fetch(GOOGLE_SHEET_CSV_URL, {
      // next.js cache: tied to revalidate above
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch sheet: ${res.status} ${res.statusText}`);
    }

    const csvText = await res.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error("Failed to load products from Google Sheet:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  // Get unique categories for filtering
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <main>
      <Header />
      <ProductGrid products={products} categories={categories} />
      <Footer />
    </main>
  );
}

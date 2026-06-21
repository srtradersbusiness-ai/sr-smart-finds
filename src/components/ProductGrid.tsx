"use client";

import { useState, useMemo } from "react";
import { Product } from "@/lib/parseProducts";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  products: Product[];
  categories: string[];
}

export default function ProductGrid({
  products,
  categories,
}: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        activeCategory === "All" || p.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Search */}
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.search}
            aria-label="Search products"
          />
        </div>

        {/* Category filters */}
        <div className={styles.filters} role="tablist" aria-label="Categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`${styles.filterBtn} ${
                activeCategory === cat ? styles.active : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className={styles.count}>
          {filtered.length === 0
            ? "No products found"
            : `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((product, index) => (
              <ProductCard key={`${product.name}-${index}`} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyIcon}>📦</p>
            <p className={styles.emptyText}>No products match your search.</p>
            <button
              className={styles.resetBtn}
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

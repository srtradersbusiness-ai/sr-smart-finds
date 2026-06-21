import { Product } from "@/lib/parseProducts";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

// Format price: if it's a number, add ₹ symbol
function formatPrice(price: string): string {
  const num = parseFloat(price.replace(/[^0-9.]/g, ""));
  if (isNaN(num)) return price;
  return "₹" + num.toLocaleString("en-IN");
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, price, image, affiliate_link, category, description } = product;

  return (
    <a
      href={affiliate_link}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={styles.card}
      aria-label={`Buy ${name} for ${formatPrice(price)}`}
    >
      {/* Image */}
      <div className={styles.imageWrap}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            className={styles.image}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%231a1a1a'/%3E%3Ctext x='100' y='110' text-anchor='middle' font-size='48' fill='%23666'%3E📦%3C/text%3E%3C/svg%3E";
            }}
          />
        ) : (
          <div className={styles.placeholder}>📦</div>
        )}
        {/* Category badge */}
        <span className={styles.categoryBadge}>{category}</span>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h2 className={styles.name}>{name}</h2>
        {description && (
          <p className={styles.description}>{description}</p>
        )}
        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(price)}</span>
          <span className={styles.cta}>
            Buy Now <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </a>
  );
}

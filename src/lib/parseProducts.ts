export interface Product {
  name: string;
  price: string;
  image: string;
  affiliate_link: string;
  category: string;
  description: string;
}

/**
 * Parses CSV text into an array of Product objects.
 * Handles quoted fields and commas inside quotes.
 */
export function parseCSV(csvText: string): Product[] {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const products: Product[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const product: Partial<Product> = {};

    headers.forEach((header, index) => {
      const key = header.trim() as keyof Product;
      product[key] = values[index]?.trim() ?? "";
    });

    if (product.name && product.affiliate_link) {
      products.push(product as Product);
    }
  }

  return products;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

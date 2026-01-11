export async function fetchProduct(barcode) {
  const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
  const data = await res.json();
  if (data.status === 1) {
    return {
      name: data.product.product_name || "Produit",
      category: data.product.categories?.split(",")[0] || "Autre"
    };
  }
}
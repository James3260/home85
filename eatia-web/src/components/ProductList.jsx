export default function ProductList({ products }) {
  return (
    <ul>
      {products.map((p, i) => (
        <li key={i}>{p.name} ({p.category}) x{p.quantity}</li>
      ))}
    </ul>
  );
}
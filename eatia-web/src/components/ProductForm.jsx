import { useState } from "react";
import BarcodeScanner from "./BarcodeScanner";
import { fetchProduct } from "../services/openFoodFacts";

export default function ProductForm({ onAdd }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Autre");
  const [quantity, setQuantity] = useState(1);
  const [scan, setScan] = useState(false);

  async function handleScan(code) {
    const data = await fetchProduct(code);
    if (data) {
      onAdd({ name: data.name, category: data.category, quantity });
    }
    setScan(false);
  }

  return (
    <>
      <form onSubmit={e => {
        e.preventDefault();
        onAdd({ name, category, quantity });
        setName("");
        setQuantity(1);
      }}>
        <input placeholder="Produit" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Catégorie" value={category} onChange={e => setCategory(e.target.value)} />
        <input type="number" value={quantity} onChange={e => setQuantity(+e.target.value)} />
        <button>Ajouter</button>
        <button type="button" onClick={() => setScan(true)}>Scanner</button>
      </form>
      {scan && <BarcodeScanner onDetected={handleScan} />}
    </>
  );
}
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { pkr } from "../utils/helpers";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    api.get(`/products/${id}`).then((r) => setProduct(r.data));
  }, [id]);

  if (!product) return <p className="p-10 text-center text-stone-500">Loading…</p>;

  const handleAdd = () => {
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <Link to="/products" className="text-sm text-stone-500 hover:text-terra">← Back to shop</Link>
      <div className="grid md:grid-cols-2 gap-10 mt-6">
        <div className="rounded-3xl overflow-hidden bg-stone-100 aspect-square">
          <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-wider text-forest mb-2 capitalize">{product.category?.replace(/-/g, " ")}</p>
          <h1 className="font-display text-3xl md:text-4xl leading-tight mb-3">{product.title}</h1>
          <p className="text-3xl font-display text-terra mb-5">{pkr(product.price)}</p>
          <p className="text-stone-600 leading-relaxed mb-8">{product.description}</p>

          <div className="flex items-center gap-3 mb-6 text-sm text-stone-500">
            <span>⭐ {product.rating}</span>
            <span>·</span>
            <span>{product.stock} in stock</span>
          </div>

          <div className="flex gap-3">
            <button onClick={handleAdd}
              className="px-8 py-3 rounded-full bg-terra text-white font-medium hover:bg-ink transition">
              {added ? "Added ✓" : "Add to cart"}
            </button>
            <Link to="/cart" className="px-8 py-3 rounded-full border border-stone-300 font-medium hover:border-ink transition">
              View cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
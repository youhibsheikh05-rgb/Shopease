import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { Link } from "react-router-dom";
import { pkr } from "../utils/helpers";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200/70 hover:border-terra/40 hover:shadow-[0_10px_30px_-15px_rgba(194,65,12,0.3)] transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square bg-stone-100 overflow-hidden">
          <img src={product.thumbnail} alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-4">
          <p className="text-[11px] uppercase tracking-wider text-stone-400 mb-1 capitalize">{product.category?.replace("-", " ")}</p>
          <h3 className="font-medium text-sm leading-snug line-clamp-2 min-h-[2.5rem]">{product.title}</h3>
          <p className="font-display text-lg text-terra mt-2">{pkr(product.price)}</p>
        </div>
      </Link>
      <button onClick={() => dispatch(addToCart(product))}
        className="w-full py-2.5 text-sm font-medium bg-stone-50 hover:bg-terra hover:text-white border-t border-stone-100 transition-colors">
        Add to cart
      </button>
    </div>
  );
}
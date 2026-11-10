import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQty } from "../features/cartSlice";
import { Link } from "react-router-dom";
import { pkr } from "../utils/helpers";

export default function Cart() {
  const { items } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  if (!items.length) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-24 text-center">
        <h1 className="font-display text-3xl mb-3">Your cart is empty</h1>
        <p className="text-stone-500 mb-6">Nothing here yet — go find something you love.</p>
        <Link to="/products" className="inline-block px-6 py-3 rounded-full bg-ink text-cream hover:bg-terra transition">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <h1 className="font-display text-3xl mb-6">Your cart</h1>
      <div className="bg-white rounded-2xl border border-stone-200/70 divide-y divide-stone-100">
        {items.map((i) => (
          <div key={i.id} className="flex items-center gap-4 p-4">
            <img src={i.thumbnail} className="w-16 h-16 rounded-xl object-cover bg-stone-100" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{i.title}</p>
              <p className="text-terra text-sm mt-0.5">{pkr(i.price)}</p>
            </div>
            <input type="number" min="1" value={i.qty}
              onChange={(e) => dispatch(updateQty({ id: i.id, qty: +e.target.value }))}
              className="w-14 border border-stone-200 rounded-lg p-1.5 text-sm text-center focus:outline-none focus:border-terra" />
            <button onClick={() => dispatch(removeFromCart(i.id))}
              className="text-stone-400 hover:text-red-500 text-lg">✕</button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between bg-white rounded-2xl border border-stone-200/70 p-5">
        <div>
          <p className="text-xs text-stone-500 uppercase tracking-wider">Total</p>
          <p className="font-display text-2xl text-terra">{pkr(total)}</p>
        </div>
        <Link to="/checkout" className="px-6 py-3 rounded-full bg-forest text-white font-medium hover:bg-ink transition">
          Checkout →
        </Link>
      </div>
    </div>
  );
}
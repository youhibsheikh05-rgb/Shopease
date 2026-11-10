import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { pkr } from "../utils/helpers";

export default function Checkout() {
  const { items } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const placeOrder = () => {
    const order = { id: Date.now(), items, total, date: new Date().toISOString() };
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([order, ...orders]));
    dispatch(clearCart());
    setPlaced(true);
    setTimeout(() => navigate("/orders"), 1600);
  };

  if (placed) {
    return (
      <div className="max-w-xl mx-auto px-5 py-28 text-center">
        <div className="text-5xl mb-4">🌿</div>
        <h1 className="font-display text-3xl mb-2">Order placed</h1>
        <p className="text-stone-500">Thank you — redirecting to your orders…</p>
      </div>
    );
  }

  if (!items.length) {
    return <div className="p-10 text-center text-stone-500">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <h1 className="font-display text-3xl mb-6">Checkout</h1>
      <div className="bg-white rounded-2xl border border-stone-200/70 divide-y divide-stone-100">
        {items.map((i) => (
          <div key={i.id} className="flex justify-between p-4 text-sm">
            <span className="text-stone-700">{i.title} <span className="text-stone-400">× {i.qty}</span></span>
            <span className="font-medium">{pkr(i.price * i.qty)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center bg-white rounded-2xl border border-stone-200/70 p-5">
        <span className="text-sm uppercase tracking-wider text-stone-500">Total</span>
        <span className="font-display text-2xl text-terra">{pkr(total)}</span>
      </div>
      <button onClick={placeOrder}
        className="mt-5 w-full py-3.5 rounded-full bg-forest text-white font-medium hover:bg-ink transition">
        Place order
      </button>
    </div>
  );
}
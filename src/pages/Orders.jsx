import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pkr } from "../utils/helpers";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("orders")) || []);
  }, []);

  if (!orders.length) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-24 text-center">
        <h1 className="font-display text-3xl mb-3">No orders yet</h1>
        <p className="text-stone-500 mb-6">Once you place an order, it'll show up here.</p>
        <Link to="/products" className="inline-block px-6 py-3 rounded-full bg-ink text-cream hover:bg-terra transition">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <h1 className="font-display text-3xl mb-6">Your orders</h1>
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-white rounded-2xl border border-stone-200/70 p-5">
            <div className="flex justify-between text-xs text-stone-500 mb-3">
              <span>Order #{o.id}</span>
              <span>{new Date(o.date).toLocaleString()}</span>
            </div>
            <div className="space-y-1.5">
              {o.items.map((i) => (
                <p key={i.id} className="text-sm text-stone-700 flex justify-between">
                  <span>{i.title} <span className="text-stone-400">× {i.qty}</span></span>
                  <span>{pkr(i.price * i.qty)}</span>
                </p>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-stone-100 flex justify-between font-medium">
              <span>Total</span>
              <span className="text-terra">{pkr(o.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
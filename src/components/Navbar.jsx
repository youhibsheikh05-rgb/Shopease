import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

export default function Navbar() {
  const { items } = useSelector((s) => s.cart);
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl text-terra tracking-tight">
          ShopEase<span className="text-forest">.</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/products" className="hover:text-terra transition">Shop</Link>
          <Link to="/orders" className="hover:text-terra transition">Orders</Link>
          <Link to="/cart" className="relative hover:text-terra transition">
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-4 bg-terra text-white text-[10px] w-5 h-5 rounded-full grid place-items-center">
                {count}
              </span>
            )}
          </Link>
          {user ? (
            <button onClick={() => { dispatch(logout()); navigate("/"); }}
              className="px-4 py-1.5 rounded-full border border-stone-300 hover:border-terra hover:text-terra transition">
              Logout
            </button>
          ) : (
            <Link to="/login" className="px-4 py-1.5 rounded-full bg-ink text-cream hover:bg-terra transition">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
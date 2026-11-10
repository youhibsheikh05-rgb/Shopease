import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="py-32 text-center">
      <p className="font-display text-6xl text-terra mb-3">404</p>
      <p className="text-stone-500 mb-6">This page wandered off somewhere.</p>
      <Link to="/" className="px-6 py-3 rounded-full bg-ink text-cream hover:bg-terra transition">Back home</Link>
    </div>
  );
}
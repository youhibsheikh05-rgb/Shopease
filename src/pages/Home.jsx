import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-5">
      <section className="py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-forest bg-forest/10 px-3 py-1 rounded-full mb-5">
            Handpicked · Everyday essentials
          </span>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] mb-5">
            Things you'll <span className="text-terra italic">actually</span> love.
          </h1>
          <p className="text-stone-600 max-w-md mb-8">
            A small, thoughtful collection — no endless scroll, no noise. Just good stuff, priced fairly.
          </p>
          <div className="flex gap-3">
            <Link to="/products" className="px-6 py-3 rounded-full bg-ink text-cream font-medium hover:bg-terra transition">
              Browse the shop
            </Link>
            <Link to="/login" className="px-6 py-3 rounded-full border border-stone-300 font-medium hover:border-ink transition">
              Sign in
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-stone-200 shadow-[0_30px_60px_-30px_rgba(28,25,23,0.35)]">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
              alt="shop" className="w-full h-full object-cover" />
          </div>
    

<div className="absolute -bottom-4 -left-4 bg-cream rounded-2xl px-5 py-4 shadow-lg border border-stone-200">
  <p className="text-xs text-stone-500">Free shipping</p>
  <p className="font-display text-lg">on orders Rs. 15,000+</p>
</div>
        </div>
      </section>

      <section className="pb-20 grid sm:grid-cols-3 gap-4">
        {[
          { t: "Curated", d: "Every item hand-picked by us." },
          { t: "Fair prices", d: "No markups, no middlemen." },
          { t: "Easy returns", d: "30 days, no questions asked." },
        ].map((f) => (
          <div key={f.t} className="p-6 rounded-2xl bg-white border border-stone-200/70">
            <h3 className="font-display text-lg mb-1">{f.t}</h3>
            <p className="text-sm text-stone-600">{f.d}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
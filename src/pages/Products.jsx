import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories } from "../features/productSlice";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";

export default function Products() {
  const dispatch = useDispatch();
  const { list, total, categories, loading } = useSelector((s) => s.products);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(0);
  const limit = 12;

  useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);
  useEffect(() => {
    dispatch(fetchProducts({ q, category, limit, skip: page * limit }));
  }, [dispatch, q, category, page]);

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="mb-8">
        <h1 className="font-display text-4xl mb-2">The shop</h1>
        <p className="text-stone-600">Everything we currently carry, in one place.</p>
      </div>

      <div className="mb-6">
        <input value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }}
          placeholder="Search for something specific…"
          className="w-full md:w-96 px-5 py-3 rounded-full bg-white border border-stone-200 focus:border-terra focus:outline-none text-sm" />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar categories={categories} active={category} setCategory={(c) => { setCategory(c); setPage(0); }} />
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-stone-200/70 overflow-hidden animate-pulse">
                  <div className="aspect-square bg-stone-100" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 w-16 bg-stone-100 rounded" />
                    <div className="h-4 w-full bg-stone-100 rounded" />
                    <div className="h-4 w-12 bg-stone-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : list.length === 0 ? (
            <div className="text-center py-20 text-stone-500">No products found. Try another search.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {list.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          {total > limit && (
            <div className="flex justify-center items-center gap-3 mt-10">
              <button disabled={page === 0} onClick={() => setPage(page - 1)}
                className="px-4 py-2 rounded-full border border-stone-300 text-sm disabled:opacity-30 hover:border-ink transition">
                ← Prev
              </button>
              <span className="text-sm text-stone-500">Page {page + 1} of {Math.ceil(total / limit)}</span>
              <button disabled={(page + 1) * limit >= total} onClick={() => setPage(page + 1)}
                className="px-4 py-2 rounded-full border border-stone-300 text-sm disabled:opacity-30 hover:border-ink transition">
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
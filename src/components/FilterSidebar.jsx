export default function FilterSidebar({ categories, active, setCategory }) {
  return (
    <aside className="w-full md:w-52 shrink-0">
      <h3 className="font-display text-lg mb-3">Categories</h3>
      <div className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2">
        <button onClick={() => setCategory("")}
          className={`text-left px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition ${!active ? "bg-terra text-white" : "hover:bg-stone-100"}`}>
          All
        </button>
        {categories.map((c) => (
          <button key={c} onClick={() => setCategory(c)}
            className={`text-left px-3 py-1.5 rounded-lg text-sm capitalize whitespace-nowrap transition ${active === c ? "bg-terra text-white" : "hover:bg-stone-100"}`}>
            {c.replace(/-/g, " ")}
          </button>
        ))}
      </div>
    </aside>
  );
}
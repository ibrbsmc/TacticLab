import AppHeader from "@/components/layout/AppHeader";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <AppHeader />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Taktik tahtası
          </h2>

          <p className="mt-2 text-slate-600">
            Saha ve takım araçları bu alanda yer alacak.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;

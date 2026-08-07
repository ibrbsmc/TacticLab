import { useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
import SportSelector from "@/components/tactics/SportSelector";

function App() {
  const [selectedSport, setSelectedSport] = useState("football");

  return (
    <div className="min-h-screen bg-slate-100">
      <AppHeader />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <SportSelector
            selectedSport={selectedSport}
            onSportChange={setSelectedSport}
          />

          <div className="mt-8 border-t pt-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Taktik tahtası
            </h2>

            <p className="mt-2 text-slate-600">Seçilen spor: {selectedSport}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

import { useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
import SportField from "@/components/tactics/SportField";
import SportSelector from "@/components/tactics/SportSelector";
import TeamSettings from "@/components/tactics/TeamSettings";

function App() {
  const [selectedSport, setSelectedSport] = useState("football");
  const [teamName, setTeamName] = useState("Ev Sahibi");

  return (
    <div className="min-h-screen bg-slate-100">
      <AppHeader />

      <main className="mx-auto max-w-7xl px-6 py-4">
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <SportSelector
            selectedSport={selectedSport}
            onSportChange={setSelectedSport}
          />

          <div className="mt-8 grid gap-8 border-t pt-6 lg:grid-cols-[280px_1fr]">
            <aside className="rounded-xl border bg-white p-5">
              <TeamSettings
                teamName={teamName}
                onTeamNameChange={setTeamName}
              />
            </aside>

            <SportField selectedSport={selectedSport} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

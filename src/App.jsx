import { useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
import PlayerManager from "@/components/tactics/PlayerManager";
import SportField from "@/components/tactics/SportField";
import SportSelector from "@/components/tactics/SportSelector";
import TeamSettings from "@/components/tactics/TeamSettings";

function App() {
  const [selectedSport, setSelectedSport] = useState("football");
  const [teamName, setTeamName] = useState("Ev Sahibi");
  const [teamColor, setTeamColor] = useState("#2563eb");
  const [players, setPlayers] = useState([]);

  const currentPlayers = players.filter(
    (player) => player.sport === selectedSport,
  );

  function handleAddPlayer(newPlayer) {
    setPlayers((currentPlayers) => [...currentPlayers, newPlayer]);
  }

  function handleDeletePlayer(playerId) {
    setPlayers((currentPlayers) =>
      currentPlayers.filter((player) => player.id !== playerId),
    );
  }

  function handleSelectCaptain(playerId) {
    setPlayers((currentPlayers) => {
      const selectedPlayer = currentPlayers.find(
        (player) => player.id === playerId,
      );

      if (!selectedPlayer) {
        return currentPlayers;
      }

      return currentPlayers.map((player) => {
        if (player.sport !== selectedPlayer.sport) {
          return player;
        }

        return {
          ...player,
          isCaptain: selectedPlayer.isCaptain ? false : player.id === playerId,
        };
      });
    });
  }

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
            <aside className="space-y-5">
              <div className="rounded-xl border bg-white p-5">
                <TeamSettings
                  teamName={teamName}
                  teamColor={teamColor}
                  onTeamNameChange={setTeamName}
                  onTeamColorChange={setTeamColor}
                />
              </div>

              <PlayerManager
                key={selectedSport}
                selectedSport={selectedSport}
                players={currentPlayers}
                onAddPlayer={handleAddPlayer}
                onDeletePlayer={handleDeletePlayer}
                onSelectCaptain={handleSelectCaptain}
              />
            </aside>

            <SportField
              selectedSport={selectedSport}
              players={currentPlayers}
              teamColor={teamColor}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

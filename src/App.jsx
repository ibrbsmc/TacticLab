import { useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
import FormationSelector from "@/components/tactics/FormationSelector";
import PlayerManager from "@/components/tactics/PlayerManager";
import SportField from "@/components/tactics/SportField";
import SportSelector from "@/components/tactics/SportSelector";
import TeamSettings from "@/components/tactics/TeamSettings";
import { defaultFormationsBySport, formationsBySport } from "@/data/formations";

function App() {
  const [selectedSport, setSelectedSport] = useState("football");
  const [teamName, setTeamName] = useState("Ev Sahibi");
  const [teamColor, setTeamColor] = useState("#2563eb");
  const [players, setPlayers] = useState([]);
  const [selectedFormations, setSelectedFormations] = useState(
    defaultFormationsBySport,
  );

  const currentPlayers = players.filter(
    (player) => player.sport === selectedSport,
  );

  const selectedFormationId = selectedFormations[selectedSport];

  const selectedFormation = formationsBySport[selectedSport].find(
    (formation) => formation.id === selectedFormationId,
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

  function handleMovePlayer(playerId, x, y) {
    setPlayers((currentPlayers) =>
      currentPlayers.map((player) =>
        player.id === playerId
          ? {
              ...player,
              x,
              y,
            }
          : player,
      ),
    );
  }

  function handleFormationChange(formationId) {
    const newFormation = formationsBySport[selectedSport].find(
      (formation) => formation.id === formationId,
    );

    if (!newFormation) {
      return;
    }

    setSelectedFormations((currentFormations) => ({
      ...currentFormations,
      [selectedSport]: formationId,
    }));

    setPlayers((currentPlayers) => {
      let playerIndex = 0;

      return currentPlayers.map((player) => {
        if (player.sport !== selectedSport) {
          return player;
        }

        const position = newFormation.positions[playerIndex];
        playerIndex += 1;

        if (!position) {
          return player;
        }

        return {
          ...player,
          x: position.x,
          y: position.y,
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

              <div className="rounded-xl border bg-white p-5">
                <FormationSelector
                  selectedSport={selectedSport}
                  selectedFormationId={selectedFormationId}
                  onFormationChange={handleFormationChange}
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
              selectedFormation={selectedFormation}
              players={currentPlayers}
              teamColor={teamColor}
              onMovePlayer={handleMovePlayer}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

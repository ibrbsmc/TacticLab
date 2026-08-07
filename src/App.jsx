import { useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
import FormationSelector from "@/components/tactics/FormationSelector";
import PlayerManager from "@/components/tactics/PlayerManager";
import SportField from "@/components/tactics/SportField";
import SportSelector from "@/components/tactics/SportSelector";
import TeamSelector from "@/components/tactics/TeamSelector";
import TeamSettings from "@/components/tactics/TeamSettings";
import { defaultFormationsBySport, formationsBySport } from "@/data/formations";

function App() {
  const [selectedSport, setSelectedSport] = useState("football");
  const [selectedTeamId, setSelectedTeamId] = useState("home");

  const [teams, setTeams] = useState({
    home: {
      id: "home",
      name: "Ev Sahibi",
      color: "#2563eb",
    },
    away: {
      id: "away",
      name: "Deplasman",
      color: "#dc2626",
    },
  });

  const [players, setPlayers] = useState([]);

  const [selectedFormations, setSelectedFormations] = useState({
    home: {
      ...defaultFormationsBySport,
    },
    away: {
      ...defaultFormationsBySport,
    },
  });

  const selectedTeam = teams[selectedTeamId];

  const currentPlayers = players.filter(
    (player) =>
      player.sport === selectedSport && player.teamId === selectedTeamId,
  );

  const selectedFormationId = selectedFormations[selectedTeamId][selectedSport];

  const selectedFormation = formationsBySport[selectedSport].find(
    (formation) => formation.id === selectedFormationId,
  );

  function handleTeamNameChange(teamName) {
    setTeams((currentTeams) => ({
      ...currentTeams,
      [selectedTeamId]: {
        ...currentTeams[selectedTeamId],
        name: teamName,
      },
    }));
  }

  function handleTeamColorChange(teamColor) {
    setTeams((currentTeams) => ({
      ...currentTeams,
      [selectedTeamId]: {
        ...currentTeams[selectedTeamId],
        color: teamColor,
      },
    }));
  }

  function handleAddPlayer(newPlayer) {
    setPlayers((currentPlayers) => [
      ...currentPlayers,
      {
        ...newPlayer,
        teamId: selectedTeamId,
      },
    ]);
  }

  function handleUpdatePlayer(playerId, updatedPlayer) {
    setPlayers((currentPlayers) =>
      currentPlayers.map((player) =>
        player.id === playerId
          ? {
              ...player,
              ...updatedPlayer,
            }
          : player,
      ),
    );
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
        const isSameTeam =
          player.teamId === selectedPlayer.teamId &&
          player.sport === selectedPlayer.sport;

        if (!isSameTeam) {
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
      [selectedTeamId]: {
        ...currentFormations[selectedTeamId],
        [selectedSport]: formationId,
      },
    }));

    setPlayers((currentPlayers) => {
      let playerIndex = 0;

      return currentPlayers.map((player) => {
        const belongsToSelectedTeam =
          player.sport === selectedSport && player.teamId === selectedTeamId;

        if (!belongsToSelectedTeam) {
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
                <TeamSelector
                  teams={teams}
                  selectedTeamId={selectedTeamId}
                  onTeamChange={setSelectedTeamId}
                />
              </div>

              <div className="rounded-xl border bg-white p-5">
                <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                  {selectedTeam.name} düzenleniyor
                </p>

                <TeamSettings
                  teamName={selectedTeam.name}
                  teamColor={selectedTeam.color}
                  onTeamNameChange={handleTeamNameChange}
                  onTeamColorChange={handleTeamColorChange}
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
                key={`${selectedSport}-${selectedTeamId}`}
                selectedSport={selectedSport}
                players={currentPlayers}
                onAddPlayer={handleAddPlayer}
                onUpdatePlayer={handleUpdatePlayer}
                onDeletePlayer={handleDeletePlayer}
                onSelectCaptain={handleSelectCaptain}
              />
            </aside>

            <SportField
              selectedSport={selectedSport}
              selectedFormation={selectedFormation}
              players={currentPlayers}
              teamColor={selectedTeam.color}
              onMovePlayer={handleMovePlayer}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

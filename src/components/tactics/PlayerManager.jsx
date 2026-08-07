import { useState } from "react";
import { Crown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const positionsBySport = {
  football: [
    { value: "goalkeeper", label: "Kaleci" },
    { value: "defender", label: "Defans" },
    { value: "midfielder", label: "Orta saha" },
    { value: "forward", label: "Forvet" },
  ],
  basketball: [
    { value: "point-guard", label: "Oyun kurucu" },
    { value: "shooting-guard", label: "Şutör gard" },
    { value: "small-forward", label: "Kısa forvet" },
    { value: "power-forward", label: "Uzun forvet" },
    { value: "center", label: "Pivot" },
  ],
  volleyball: [
    { value: "setter", label: "Pasör" },
    { value: "outside-hitter", label: "Smaçör" },
    { value: "opposite", label: "Pasör çaprazı" },
    { value: "middle-blocker", label: "Orta oyuncu" },
    { value: "libero", label: "Libero" },
  ],
};

function PlayerManager({
  selectedSport,
  players,
  onAddPlayer,
  onDeletePlayer,
  onSelectCaptain,
}) {
  const [playerName, setPlayerName] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [playerPosition, setPlayerPosition] = useState("");
  const [error, setError] = useState("");

  const currentPositions = positionsBySport[selectedSport];

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedPlayerName = playerName.trim();
    const numericPlayerNumber = Number(playerNumber);

    if (!cleanedPlayerName || playerNumber === "" || !playerPosition) {
      setError("Oyuncu adı, forma numarası ve pozisyon zorunludur.");
      return;
    }

    if (
      !Number.isInteger(numericPlayerNumber) ||
      numericPlayerNumber < 1 ||
      numericPlayerNumber > 99
    ) {
      setError("Forma numarası 1 ile 99 arasında tam sayı olmalıdır.");
      return;
    }

    const isNumberUsed = players.some(
      (player) => player.number === numericPlayerNumber,
    );

    if (isNumberUsed) {
      setError("Bu forma numarası başka bir oyuncuda kullanılıyor.");
      return;
    }

    const newPlayer = {
      id: crypto.randomUUID(),
      sport: selectedSport,
      name: cleanedPlayerName,
      number: numericPlayerNumber,
      position: playerPosition,
      isCaptain: false,
    };

    onAddPlayer(newPlayer);

    setPlayerName("");
    setPlayerNumber("");
    setPlayerPosition("");
    setError("");
  }

  function getPositionLabel(positionValue) {
    const position = currentPositions.find(
      (currentPosition) => currentPosition.value === positionValue,
    );

    return position?.label || "Pozisyon belirtilmedi";
  }

  return (
    <div className="rounded-xl border bg-white p-5">
      <h2 className="text-lg font-semibold text-slate-900">Oyuncular</h2>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="player-name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Oyuncu adı
          </label>

          <Input
            id="player-name"
            type="text"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
            placeholder="Oyuncu adını yazın"
          />
        </div>

        <div>
          <label
            htmlFor="player-number"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Forma numarası
          </label>

          <Input
            id="player-number"
            type="number"
            min="1"
            max="99"
            value={playerNumber}
            onChange={(event) => setPlayerNumber(event.target.value)}
            placeholder="Örneğin 10"
          />
        </div>

        <div>
          <label
            htmlFor="player-position"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Pozisyon
          </label>

          <select
            id="player-position"
            value={playerPosition}
            onChange={(event) => setPlayerPosition(event.target.value)}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">Pozisyon seçin</option>

            {currentPositions.map((position) => (
              <option key={position.value} value={position.value}>
                {position.label}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" className="w-full">
          Oyuncu Ekle
        </Button>
      </form>

      {players.length === 0 ? (
        <p className="mt-5 text-sm text-slate-500">
          Bu spor için henüz oyuncu eklenmedi.
        </p>
      ) : (
        <ul className="mt-5 space-y-2">
          {players.map((player) => (
            <li
              key={player.id}
              className="flex items-center gap-3 rounded-lg bg-slate-100 px-3 py-2"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                {player.number}
              </span>

              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 truncate font-medium text-slate-800">
                  {player.name}

                  {player.isCaptain && (
                    <Crown
                      size={15}
                      className="shrink-0 text-amber-500"
                      aria-label="Takım kaptanı"
                    />
                  )}
                </p>

                <p className="text-xs text-slate-500">
                  {getPositionLabel(player.position)}
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onSelectCaptain(player.id)}
                aria-label={`${player.name} adlı oyuncuyu kaptan yap`}
                title="Kaptan yap"
              >
                <Crown
                  className={
                    player.isCaptain ? "text-amber-500" : "text-slate-400"
                  }
                />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onDeletePlayer(player.id)}
                aria-label={`${player.name} adlı oyuncuyu sil`}
              >
                <Trash2 className="text-red-600" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PlayerManager;

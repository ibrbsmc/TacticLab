import { Crown, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";

const positionsBySport = {
  football: ["Kaleci", "Defans", "Orta Saha", "Forvet"],
  basketball: [
    "Oyun Kurucu",
    "Şutör Guard",
    "Kısa Forvet",
    "Uzun Forvet",
    "Pivot",
  ],
  volleyball: ["Pasör", "Smaçör", "Orta Oyuncu", "Pasör Çaprazı", "Libero"],
};

const fieldPlayerLimits = {
  football: 11,
  basketball: 5,
  volleyball: 6,
};

const squadLimits = {
  football: 18,
  basketball: 12,
  volleyball: 13,
};

function PlayerManager({
  selectedSport,
  players,
  onAddPlayer,
  onUpdatePlayer,
  onDeletePlayer,
  onSelectCaptain,
}) {
  const positions = positionsBySport[selectedSport];
  const fieldPlayerLimit = fieldPlayerLimits[selectedSport];
  const squadLimit = squadLimits[selectedSport];

  const [playerName, setPlayerName] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [playerPosition, setPlayerPosition] = useState(positions[0]);
  const [editingPlayerId, setEditingPlayerId] = useState(null);
  const [error, setError] = useState("");

  function resetForm() {
    setPlayerName("");
    setPlayerNumber("");
    setPlayerPosition(positions[0]);
    setEditingPlayerId(null);
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedPlayerName = playerName.trim();
    const numericPlayerNumber = Number(playerNumber);

    if (!cleanedPlayerName) {
      setError("Oyuncu adı boş bırakılamaz.");
      return;
    }

    if (
      !Number.isInteger(numericPlayerNumber) ||
      numericPlayerNumber < 1 ||
      numericPlayerNumber > 99
    ) {
      setError("Forma numarası 1 ile 99 arasında olmalıdır.");
      return;
    }

    const numberAlreadyExists = players.some(
      (player) =>
        player.number === numericPlayerNumber && player.id !== editingPlayerId,
    );

    if (numberAlreadyExists) {
      setError("Bu forma numarası başka bir oyuncu tarafından kullanılıyor.");
      return;
    }

    if (!editingPlayerId && players.length >= squadLimit) {
      setError(`Bu takımda en fazla ${squadLimit} oyuncu bulunabilir.`);
      return;
    }

    if (editingPlayerId) {
      onUpdatePlayer(editingPlayerId, {
        name: cleanedPlayerName,
        number: numericPlayerNumber,
        position: playerPosition,
      });

      resetForm();
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
    resetForm();
  }

  function handleStartEditing(player) {
    setPlayerName(player.name);
    setPlayerNumber(String(player.number));
    setPlayerPosition(player.position);
    setEditingPlayerId(player.id);
    setError("");
  }

  function handleDelete(playerId) {
    onDeletePlayer(playerId);

    if (editingPlayerId === playerId) {
      resetForm();
    }
  }

  return (
    <section className="rounded-xl border bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">
          Oyuncu Yönetimi
        </h2>

        <span className="text-sm text-slate-500">
          {players.length}/{squadLimit}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="player-name"
            className="block text-sm font-medium text-slate-700"
          >
            Oyuncu Adı
          </label>

          <input
            id="player-name"
            type="text"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
            placeholder="Örnek: Arda"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="player-number"
            className="block text-sm font-medium text-slate-700"
          >
            Forma Numarası
          </label>

          <input
            id="player-number"
            type="number"
            min="1"
            max="99"
            value={playerNumber}
            onChange={(event) => setPlayerNumber(event.target.value)}
            placeholder="10"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="player-position"
            className="block text-sm font-medium text-slate-700"
          >
            Pozisyon
          </label>

          <select
            id="player-position"
            value={playerPosition}
            onChange={(event) => setPlayerPosition(event.target.value)}
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
          >
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {editingPlayerId ? "Değişiklikleri Kaydet" : "Oyuncu Ekle"}
          </button>

          {editingPlayerId && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center justify-center rounded-md border border-slate-300 px-3 text-slate-600 hover:bg-slate-50"
              aria-label="Düzenlemeyi iptal et"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </form>

      <div className="mt-6 space-y-2">
        {players.length === 0 ? (
          <p className="text-sm text-slate-500">Henüz oyuncu eklenmedi.</p>
        ) : (
          players.map((player, index) => {
            const isOnField = index < fieldPlayerLimit;

            return (
              <article
                key={player.id}
                className="rounded-lg border border-slate-200 p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                        {player.number}
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-900">
                          {player.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {player.position}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        isOnField
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {isOnField ? "Sahada" : "Yedek"}
                    </span>
                  </div>

                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => onSelectCaptain(player.id)}
                      className={`rounded p-1.5 ${
                        player.isCaptain
                          ? "bg-amber-100 text-amber-600"
                          : "text-slate-500 hover:bg-slate-100"
                      }`}
                      aria-label="Kaptan seç"
                    >
                      <Crown size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartEditing(player)}
                      className="rounded p-1.5 text-blue-600 hover:bg-blue-50"
                      aria-label="Oyuncuyu düzenle"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(player.id)}
                      className="rounded p-1.5 text-red-600 hover:bg-red-50"
                      aria-label="Oyuncuyu sil"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}

export default PlayerManager;

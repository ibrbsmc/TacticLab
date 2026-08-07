import { Crown } from "lucide-react";

const sportDetails = {
  football: {
    title: "Futbol Sahası",
    backgroundColor: "bg-emerald-600",
  },
  basketball: {
    title: "Basketbol Sahası",
    backgroundColor: "bg-orange-400",
  },
  volleyball: {
    title: "Voleybol Sahası",
    backgroundColor: "bg-sky-500",
  },
};

const playerPositionsBySport = {
  football: [
    { x: 50, y: 88 },
    { x: 15, y: 70 },
    { x: 38, y: 72 },
    { x: 62, y: 72 },
    { x: 85, y: 70 },
    { x: 25, y: 48 },
    { x: 50, y: 52 },
    { x: 75, y: 48 },
    { x: 20, y: 25 },
    { x: 50, y: 18 },
    { x: 80, y: 25 },
  ],
  basketball: [
    { x: 50, y: 80 },
    { x: 25, y: 60 },
    { x: 75, y: 60 },
    { x: 35, y: 30 },
    { x: 65, y: 30 },
  ],
  volleyball: [
    { x: 25, y: 72 },
    { x: 50, y: 72 },
    { x: 75, y: 72 },
    { x: 25, y: 35 },
    { x: 50, y: 35 },
    { x: 75, y: 35 },
  ],
};

function SportField({ selectedSport, players, teamColor }) {
  const currentSport = sportDetails[selectedSport];
  const playerPositions = playerPositionsBySport[selectedSport];

  const displayedPlayers = players.slice(0, playerPositions.length);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-900">
        {currentSport.title}
      </h2>

      <div
        className={`relative mt-4 aspect-16/10 w-full overflow-hidden rounded-xl border-4 border-white shadow-md ${currentSport.backgroundColor}`}
      >
        {selectedSport === "football" && (
          <>
            <div className="absolute bottom-4 left-1/2 top-4 border-l-2 border-white/80" />

            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/80" />

            <div className="absolute left-4 top-1/2 h-40 w-24 -translate-y-1/2 border-2 border-l-0 border-white/80" />

            <div className="absolute right-4 top-1/2 h-40 w-24 -translate-y-1/2 border-2 border-r-0 border-white/80" />
          </>
        )}

        {selectedSport === "basketball" && (
          <>
            <div className="absolute bottom-4 left-1/2 top-4 border-l-2 border-white/80" />

            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/80" />

            <div className="absolute left-4 top-1/2 h-36 w-24 -translate-y-1/2 border-2 border-l-0 border-white/80" />

            <div className="absolute right-4 top-1/2 h-36 w-24 -translate-y-1/2 border-2 border-r-0 border-white/80" />
          </>
        )}

        {selectedSport === "volleyball" && (
          <>
            <div className="absolute bottom-4 left-1/2 top-4 border-l-4 border-white/90" />

            <div className="absolute bottom-4 left-1/3 top-4 border-l-2 border-dashed border-white/70" />

            <div className="absolute bottom-4 right-1/3 top-4 border-l-2 border-dashed border-white/70" />
          </>
        )}

        {players.length === 0 && (
          <p className="absolute inset-0 z-10 flex items-center justify-center text-sm font-medium text-white/80">
            Sahada gösterilecek oyuncu bulunmuyor.
          </p>
        )}

        {displayedPlayers.map((player, index) => {
          const position = playerPositions[index];

          return (
            <div
              key={player.id}
              className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
            >
              <div
                className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-white font-bold text-white shadow-md"
                style={{ backgroundColor: teamColor }}
              >
                {player.number}

                {player.isCaptain && (
                  <Crown
                    size={17}
                    className="absolute -right-2 -top-2 fill-amber-400 text-amber-500"
                    aria-label="Takım kaptanı"
                  />
                )}
              </div>

              <span className="mt-1 max-w-24 truncate rounded bg-slate-950/70 px-2 py-0.5 text-xs font-medium text-white">
                {player.name}
              </span>
            </div>
          );
        })}
      </div>

      {players.length > playerPositions.length && (
        <p className="mt-2 text-sm text-slate-500">
          Sahada ilk {playerPositions.length} oyuncu gösteriliyor.
        </p>
      )}
    </div>
  );
}

export default SportField;

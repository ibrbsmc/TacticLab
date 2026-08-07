function TeamSelector({ teams, selectedTeamId, onTeamChange }) {
  return (
    <div>
      <h2 className="text-sm font-medium text-slate-700">Takım Seçimi</h2>

      <div className="mt-2 grid grid-cols-2 gap-2">
        {Object.values(teams).map((team) => {
          const isSelected = team.id === selectedTeamId;

          return (
            <button
              key={team.id}
              type="button"
              onClick={() => onTeamChange(team.id)}
              aria-pressed={isSelected}
              className={`flex min-w-0 items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium ${
                isSelected
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: team.color }}
              />

              <span className="truncate">{team.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TeamSelector;

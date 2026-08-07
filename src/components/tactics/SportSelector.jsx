import { Button } from "../ui/button";

function SportSelector({ selectedSport, onSportChange }) {
  const sports = [
    { value: "football", label: "Futbol" },
    { value: "basketball", label: "Basketbol" },
    { value: "volleyball", label: "Voleybol" },
  ];
  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900">Spor Seçimi</h2>
      <div className="mt-3 flex flex-wrap gap-3">
        {sports.map((sport) => (
          <Button
            key={sport.value}
            type="button"
            variant={selectedSport === sport.value ? "default" : "outline"}
            onClick={() => onSportChange(sport.value)}
          >
            {sport.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default SportSelector;

import { formationsBySport } from "@/data/formations";

function FormationSelector({
  selectedSport,
  selectedFormationId,
  onFormationChange,
}) {
  const formations = formationsBySport[selectedSport];

  return (
    <div>
      <label
        htmlFor="formation"
        className="block text-sm font-medium text-slate-700"
      >
        Hazır Diziliş
      </label>

      <select
        id="formation"
        value={selectedFormationId}
        onChange={(event) => onFormationChange(event.target.value)}
        className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
      >
        {formations.map((formation) => (
          <option key={formation.id} value={formation.id}>
            {formation.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormationSelector;

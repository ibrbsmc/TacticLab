import { Input } from "@/components/ui/input";

function TeamSettings({ teamName, onTeamNameChange }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900">Takım ayarları</h2>

      <div className="mt-4">
        <label
          htmlFor="team-name"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Takım adı
        </label>

        <Input
          id="team-name"
          type="text"
          value={teamName}
          onChange={(event) => onTeamNameChange(event.target.value)}
          placeholder="Takım adını yazın"
        />
      </div>

      <div className="mt-5 rounded-lg bg-slate-100 p-4">
        <p className="text-sm text-slate-500">Sahadaki takım</p>
        <p className="mt-1 font-semibold text-slate-900">
          {teamName.trim() || "İsimsiz takım"}
        </p>
      </div>
    </div>
  );
}

export default TeamSettings;

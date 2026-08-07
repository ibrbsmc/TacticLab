import { Input } from "@/components/ui/input";

function TeamSettings({
  teamName,
  teamColor,
  onTeamNameChange,
  onTeamColorChange,
}) {
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

      <div className="mt-4">
        <label
          htmlFor="team-color"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Takım rengi
        </label>

        <div className="flex items-center gap-3">
          <Input
            id="team-color"
            type="color"
            value={teamColor}
            onChange={(event) => onTeamColorChange(event.target.value)}
            className="h-10 w-16 cursor-pointer p-1"
          />

          <span className="text-sm text-slate-600">{teamColor}</span>
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-slate-100 p-4">
        <p className="text-sm text-slate-500">Sahadaki takım</p>

        <div className="mt-2 flex items-center gap-3">
          <span
            className="h-5 w-5 rounded-full border"
            style={{ backgroundColor: teamColor }}
          />

          <p className="font-semibold text-slate-900">
            {teamName.trim() || "İsimsiz takım"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TeamSettings;

import { Button } from "@/components/ui/button";

function AppHeader() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">TacticLab</h1>
          <p className="text-sm text-slate-500">Taktik ve diziliş tahtası</p>
        </div>

        <Button>Yeni Taktik</Button>
      </div>
    </header>
  );
}

export default AppHeader;

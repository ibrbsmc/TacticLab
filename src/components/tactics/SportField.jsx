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

function SportField({ selectedSport }) {
  const currentSport = sportDetails[selectedSport];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-900">
        {currentSport.title}
      </h2>

      <div
        className={`relative mt-4 aspect-16/10 w-full overflow-hidden rounded-xl border-4 border-white shadow-md ${currentSport.backgroundColor}`}
      >
        <div className="absolute inset-4 border-2 border-white/80" />

        {selectedSport === "football" && (
          <>
            <div className="absolute bottom-4 left-1/2 top-4 border-l-2 border-white/80" />

            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/80" />

            <div className="absolute bottom-1/4 left-4 top-1/4 w-20 border-2 border-l-0 border-white/80" />

            <div className="absolute bottom-1/4 right-4 top-1/4 w-20 border-2 border-r-0 border-white/80" />
          </>
        )}

        {selectedSport === "basketball" && (
          <>
            <div className="absolute bottom-4 left-1/2 top-4 border-l-2 border-white/80" />

            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/80" />

            <div className="absolute bottom-1/3 left-4 top-1/3 w-24 border-2 border-l-0 border-white/80" />

            <div className="absolute bottom-1/3 right-4 top-1/3 w-24 border-2 border-r-0 border-white/80" />
          </>
        )}

        {selectedSport === "volleyball" && (
          <>
            <div className="absolute bottom-4 left-1/2 top-4 border-l-4 border-white" />

            <div className="absolute bottom-4 left-1/3 top-4 border-l-2 border-white/80" />

            <div className="absolute bottom-4 left-2/3 top-4 border-l-2 border-white/80" />
          </>
        )}
      </div>
    </div>
  );
}

export default SportField;

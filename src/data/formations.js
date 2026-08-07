export const formationsBySport = {
  football: [
    {
      id: "4-3-3",
      label: "4-3-3",
      positions: [
        { x: 8, y: 50 },

        { x: 25, y: 15 },
        { x: 25, y: 38 },
        { x: 25, y: 62 },
        { x: 25, y: 85 },

        { x: 50, y: 25 },
        { x: 50, y: 50 },
        { x: 50, y: 75 },

        { x: 78, y: 20 },
        { x: 78, y: 50 },
        { x: 78, y: 80 },
      ],
    },
    {
      id: "4-4-2",
      label: "4-4-2",
      positions: [
        { x: 8, y: 50 },

        { x: 25, y: 15 },
        { x: 25, y: 38 },
        { x: 25, y: 62 },
        { x: 25, y: 85 },

        { x: 50, y: 15 },
        { x: 50, y: 38 },
        { x: 50, y: 62 },
        { x: 50, y: 85 },

        { x: 78, y: 35 },
        { x: 78, y: 65 },
      ],
    },
    {
      id: "3-5-2",
      label: "3-5-2",
      positions: [
        { x: 8, y: 50 },

        { x: 25, y: 25 },
        { x: 25, y: 50 },
        { x: 25, y: 75 },

        { x: 50, y: 10 },
        { x: 50, y: 30 },
        { x: 50, y: 50 },
        { x: 50, y: 70 },
        { x: 50, y: 90 },

        { x: 78, y: 35 },
        { x: 78, y: 65 },
      ],
    },
  ],

  basketball: [
    {
      id: "standard",
      label: "Standart",
      positions: [
        { x: 30, y: 50 },
        { x: 45, y: 25 },
        { x: 45, y: 75 },
        { x: 70, y: 30 },
        { x: 70, y: 70 },
      ],
    },
  ],

  volleyball: [
    {
      id: "standard",
      label: "Standart",
      positions: [
        { x: 30, y: 25 },
        { x: 30, y: 50 },
        { x: 30, y: 75 },
        { x: 70, y: 25 },
        { x: 70, y: 50 },
        { x: 70, y: 75 },
      ],
    },
  ],
};

export const defaultFormationsBySport = {
  football: "4-3-3",
  basketball: "standard",
  volleyball: "standard",
};

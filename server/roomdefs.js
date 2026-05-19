module.exports = {
  lobby: {
    spawn: {
      x: 679,
      y: 749
    },

    interactions: [
      {
        id: "to_room1",
        type: "exit",

        x: 560,
        y: 150,
        w: 40,
        h: 120,

        to: "room1",

        spawn: {
          x: 80,
          y: 200
        }
      }
    ],

    obstacles: []
  },

  room1: {
    spawn: {
      x: 200,
      y: 200
    },

    interactions: [
      {
        id: "to_lobby",
        type: "exit",

        x: 0,
        y: 150,
        w: 40,
        h: 120,

        to: "lobby",

        spawn: {
          x: 500,
          y: 200
        }
      }
    ],

    obstacles: []
  }
};
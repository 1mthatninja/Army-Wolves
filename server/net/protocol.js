const C2S = {
  AUTH: "auth",
  MOVE: "move",
  CHAT: "chat",
  PING: "ping",

  JOIN_ROOM: "join_room",
  LEAVE_ROOM: "leave_room",

  EMOTE: "emote",
  INTERACT: "interact"
};

const S2C = {
  INIT: "init",
  STATE: "state",

  CHAT: "chat",
  EMOTE: "emote",

  PLAYER_JOIN: "player_join",
  PLAYER_LEAVE: "player_leave",

  ROOM_DATA: "room_data",
  ERROR: "error"
};

module.exports = {
  C2S,
  S2C
};
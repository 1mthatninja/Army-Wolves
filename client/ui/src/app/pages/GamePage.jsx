import { useEffect } from "react";
import GameCanvas from "../../components/GameCanvas";

import { GameClient } from "../../game/engine/engine/gameClient.js";

export default function GamePage() {
  useEffect(() => {
    const session = {
      token: "test",
      server: "lobby",
      playerId: null
    };

    const client = new GameClient(session);

    client.start();

    return () => {
      client.stop();
    };
  }, []);

  return <GameCanvas />;
}
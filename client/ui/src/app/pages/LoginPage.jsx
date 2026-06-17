import { useState } from "react";

import LoginPage from "./app/screens/LoginPage.jsx";
import ServerSelectPage from "./app/screens/ServerSelectPage.jsx";
import LoadingPage from "./app/screens/LoadingPage.jsx";
import GamePage from "./app/screens/GamePage.jsx";

export default function App() {
  const [screen, setScreen] = useState("login");

  switch (screen) {
    case "login":
      return (
        <LoginPage
          onNext={() => setScreen("server")}
        />
      );

    case "server":
      return (
        <ServerSelectPage
          onNext={() => setScreen("loading")}
        />
      );

    case "loading":
      return (
        <LoadingPage
          onNext={() => setScreen("game")}
        />
      );

    case "game":
      return <GamePage />;

    default:
      return <div>Unknown screen</div>;
  }
}
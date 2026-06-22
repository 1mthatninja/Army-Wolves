server/

│

├── index.js                # boot entrypoint

├── config/

│   ├── constants.js

│   └── env.js

│

├── net/

│   ├── websocketServer.js

│   ├── packetRouter.js

│   ├── protocol.js

│   ├── broadcaster.js

│   └── sessionManager.js

│

├── engine/

│   ├── engine.js

│   ├── tickLoop.js

│   └── systems/

│       ├── movementSystem.js

│       ├── collisionSystem.js

│       ├── interactionSystem.js

│       ├── npcSystem.js

│       └── questSystem.js

│

├── world/

│   ├── worldState.js

│   ├── roomManager.js

│   ├── roomdefs.js

│   └── rooms/

│       ├── lobby.js

│       ├── town.js

│       └── igloo.js

│

├── player/

│   ├── playerManager.js

│   ├── playerFactory.js

│   ├── inventory.js

│   ├── coins.js

│   └── profile.js

│

├── social/

│   ├── chatSystem.js

│   ├── emoteSystem.js

│   ├── friendSystem.js

│   └── moderation.js

│

├── npc/

│   ├── npcManager.js

│   ├── dialogue.js

│   └── shopNPC.js

│

├── quests/

│   ├── questManager.js

│   └── questdefs.js

│

├── minigames/

│   ├── sledRace.js

│   └── fishingGame.js

│

├── api/

│   └── auth.js

│

└── db/

    ├── init.js

    ├── database.js

    ├── auth.js

    ├── players.js

    ├── inventory.js

    └── homes.js 
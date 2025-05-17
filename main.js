// A user can create a Minecraft server.
//
// A server has a maximum player capacity and a server type.
//
// Players can join or leave a server.
//
// A server can be started, stopped, or restarted.
//
// Servers store world data (e.g., seed, plugin list).
//
// Some users are admins and can manage multiple servers.
//
//User
//     username, email
//
//     owns 0 or more servers
//
//     can be a player or admin
//
// Player
//
//     joins and plays on servers
//
//     has inventory and current location
//
// MinecraftServer
//
//     serverId, serverType, status (Running, Stopped, Starting)
//
//     maxSlots, currentPlayers
//
//     start(), stop(), restart()
//
//     addPlugin(), removePlugin()
//
// Plugin
//
//     name, version, description
//
//     compatibleWith(serverType)
//
// WorldData
//
//     seed, timeOfDay, isRaining
//
// ServerManager
//
//     start server, stop server
//
//     track all servers
//
//     handle matchmaking for users

class User {
  serverList = [];
  constructor(username, email) {
    this.username = username
    this.email = email
  }
  addServer(server) {
    this.serverList.push(server)
  }
}

class AdminUser extends User {
  constructor(username, email) {
    super(username, email)
  }
  stopServer(serverID) { }
  startServer(serverID) { }
  listServers(serverID) { }
  connectUser(username, serverID) { }
  createServer(startupScript, maxSlots, serverType) {
    const server = new MinecraftServer(startupScript, maxSlots, serverType)
    this.serverList.push(server)
    return server
  }
}

class Player extends User {
  inventory = []
  locationx = 0;
  locationy = 0;
  locationz = 0;
  constructor(username, email) {
    super(username, email)
  }
  joinServer(serverID) {
    for (const server of this.serverList) {
      if (server.serverID === serverID) {
        if (server.currentPlayers.length > server.maxSlots) {
          console.log("server is full, cannot join")
        } else {
          server.currentPlayers.push(this)
          console.log(`Player ${this.username} connected to server ${serverID}`)
        }
      } else {
        console.log("server not found")
      }
    }
  }

  leaveServer(serverID) { }
}


class MinecraftServer {
  serverID = "";
  status = "";
  currentPlayers = [];
  constructor(startupScript, maxSlots, serverType) {
    this.startupScript = startupScript
    this.maxSlots = maxSlots
    this.serverType = serverType
    this.serverID = Math.random()
    this.status = "Starting"
  }

  start() { }
  stop() { }
  restart() { }
  addPlugin(pluginID) { }
  removePlugin(pluginID) { }
}

class Plugin {
  constructor(name, version, description) {
    this.name = name
    this.version = version
    this.description = description
  }
}

class Data {
  seed = "";
  timeofDay = new Date();
  isRaining = false;
}


function main() {
  const admin = new AdminUser("hnucamendi", "hnucamendi@test.com")
  const player = new Player("george", "george@test.com")


  const server = admin.createServer("start", 20, "vanilla")
  player.addServer(server)
  player.joinServer(server.serverID)

}

main()

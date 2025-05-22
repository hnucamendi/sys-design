// 🧠 Problem Statement:
//
// Design an object-oriented system for a logistics company (like UPS or FedEx) that handles packages moving between distribution centers and delivery addresses.
// Your system should track where packages are, where they're going, and what state they're in.
// ✅ Functional Requirements:
//
//     Users can:
//
//         Create a shipment (with origin and destination)
//
//         Track their package (see current status and location)
//
//     The system can:
//
//         Assign a package to a route between distribution centers
//
//         Update package status: Label Created, In Transit, Out for Delivery, Delivered, Exception
//
//         Transfer packages between distribution centers based on location and distance
//
//         Route packages intelligently (e.g., shortest or fastest path)

class User {
  constructor(username, email, defaultAddress) {
    this.username = username
    this.email = email
    this.defaultAddress = defaultAddress
  }


  shipPackage(origin, destination, system) {
    return system.shipPackage(origin, destination, this)
  }

  trackPackage(trackingID, system) {
    return system.trackPackage(trackingID)
  }
}

class PackageTracking {
  outgoing = []
  addOutGoing(distance, trackingID, status, packageDetails) {
    outgoing.push({
      distance: distance,
      trackingID, trackingID,
      status, status,
      packageDetails: packageDetails
    })
  }
}

class System {
  packages = {}

  lookup(location) {
    // in the real world this would be in charge of finding the exact location of an address
    // it would also ensure the address was valid.
    return { x: 0, y: 1, z: 2 }
  }

  calulateDistance(origin, destination) {
    // this would be used to estimate delivery time
    return this.lookup(origin).x - this.lookup(destination).x
  }
  shipPackage(origin, destination, user) {
    if (!origin) origin = user.defaultAddress
    const distance = this.calulateDistance(origin, destination)
    const ETA = this.calulateDistance(origin, destination) / 10
    const trackingID = Math.random() * 10

    if (!this.packages[user.username]) {
      this.packages[user.username] = new PackageTracking()
    }

    this.packages[user.username].addOutGoing(distance, trackingID, "processing", { type: "resi", weight: 1.34 })

    return { ETA, trackingID }
  }

  trackPackage(trackingID, user) {
    return

  }
}

function main() {
  const user = new User("j@test.com", "j@test.com", "123 road ln")
  const system = new System()

  user.shipPackage(null, "543 lane rd", system)
}

main()

// Customers can:
//
//     Make a reservation for a specific time and party size
//
//     Cancel a reservation
//
//     Walk in and request a table (if available)
//
// The system can:
//
//     Assign tables based on party size and availability
//
//     Track current table usage
//
//     Free tables after a reservation is complete
//
//     Allow staff to see table status (e.g. "occupied", "available", "reserved")


// Optional Advanced Features:

// Differentiate between indoor and outdoor seating
//
// Implement no-show logic and auto-release of unclaimed tables
//
// Add waitlist support for when no tables are available
//
// Allow grouping multiple tables for large parties/
//

class Restaurant {
  layout = null;
  constructor(layout) {
    this.layout = layout
  }
}
// Layout is a matrix of tables
// 0 = indoor seating
// 1 = outdoor seating
// example seating- 
// [
// [1, 1, 1, 1]
// [0, 0, 0, 1]
// [0, 0, 0, 1]
// [0, 0, 0, 1]
// [0, 0, 0, 1]
// [1, 1, 1, 1]
// ]
class Layout {
  constructor(layout, seatingCapacity) {
    this.layout = layout
    this.seatingCapacity = seatingCapacity
  }
}

class System {
  constructor(restaurant) {
    this.restaurant = restaurant;
  }

  assignTable(preferredSeating, partySize) {
    // TODO: make this into an ENUM
    // preferredSeating 0 = indoor, 1 = outdoor
    //
    if (!preferredSeating) preferredSeating = 0
    const tablesNeeded = Math.ceil(partySize / this.restaurant.layout.seatingCapacity)
    const tablesAssigned = []

    while (tablesAssigned.length < tablesNeeded) {
      for (let i = 0; i < this.restaurant.layout.layout.length; i++) {
        for (let j = 0; j < this.restaurant.layout.layout[i].length; j++) {
          // TODO: handle if the preferred seating is not available
          // offer less optimal seating > no seating at all
          if (tablesAssigned.length === tablesNeeded) break
          if (this.restaurant.layout.layout[i][j].location === preferredSeating) {
            tablesAssigned.push(this.restaurant.layout.layout[i][j].location)
            this.toggleTableOccupied(this.restaurant.layout.layout[i][j])
          }
        }
      }
    }
    return tablesAssigned
  }


  listOccupiedTables() {
    for (let i = 0; i < this.restaurant.layout.layout.length; i++) {
      for (let j = 0; j < this.restaurant.layout.layout[i].length; j++) {
      }
    }

  }
}

class Reservation {
  //TODO: consider adding "preferred seating" field
  constructor(name, time, partySize) {
    this.name = name
    this.time = time
    this.partySize = partySize;
  }
}

class Customer {
  reservations = [];
  constructor(name) {
    this.name = name
  }

  makeReservation(partySize) {
    // needs to check if a reservation has already been made
    // also needs to account for time
    const seats = system.assignTable(0, partySize)
    console.log(seats)
  }
  cancelReservation() { }
  walkIn() { }
}

// these could be classes like "Table"
const defaultOT = { location: 1, occupied: false }
const defaultIT = { location: 0, occupied: false }

const layout = new Layout(
  [
    [defaultOT, defaultOT, defaultOT, defaultOT],
    [defaultIT, defaultIT, defaultIT, defaultOT],
    [defaultIT, defaultIT, defaultIT, defaultOT],
    [defaultIT, defaultIT, defaultIT, defaultOT],
    [defaultIT, defaultIT, defaultIT, defaultOT],
    [defaultOT, defaultOT, defaultOT, defaultOT],
  ], 4)

const restaurant = new Restaurant(layout)
const system = new System(restaurant)
function main() {
  // TODO: what happens when we get two people of the same name.
  // Reservations should have unique IDs
  const customer1 = new Customer("Henry")
  const customer2 = new Customer("Patrick")
  customer1.makeReservation(4)
  customer2.makeReservation(9)
}

main()

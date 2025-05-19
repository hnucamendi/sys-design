// 🧠 Problem Statement:
//
// Design an object-oriented system that handles the scheduling of movie screenings, seat selection, and ticket purchases at a movie theater.
// ✅ Functional Requirements:
//
//     Users can:
//
//         Browse available movie screenings (by title or time)
//
//         View seating layout for a given screening
//
//         Select and reserve specific seats
//
//         Purchase a ticket (once seats are reserved)
//
//         Cancel a reservation before the showtime
//
//     The system can:
//
//         Track seat availability per screening
//
//         Prevent double-booking
//
//         Release reserved seats after a timeout (e.g., 5 minutes without purchase)


class Screening {
  totalSeats = 40
  reservedSeats = 0
  constructor(screening) {
    this.screening = screening
    if (this.reservedSeats > this.totalSeats) {
      throw new Error("There are no more seats for ${this.screening}")
    }
  }
}

class System {
  screenings = []
  constructor() {
  }

  addScreening(screening) {
    this.screenings.push(screening)
  }
  listAvailableScreenings() {
    return this.screenings
  }

  reserveSeat() {

  }
  releaseSeat() {

  }

}

class User {
  constructor(email, password) {
    this.email = email
    this.password = password
  }

  browseMovies() {
    // for this to really remain ideal we would want to make sure there is only one system
    return system.listAvailableScreenings()
  }

  browseSeats(screening, partySize) {
    // at this point we probably want a mutual exclusive lock to prevent
    // anyone else from taking the seats of another user for some given time
    const remainingSeats = screening.totalSeats - screening.reservedSeats
    if (remainingSeats < partySize) {
      throw new Error("Sorry this movie is booked!")
    }

    return remainingSeats
  }

  reserveSeats(screening, partySize) {
    screening.totalSeats - partySize

  }

  purchaseTickets() {

  }

  cancelReservation() {

  }

}

const system = new System()
system.addScreening(new Screening("Scary Movie"))

function main() {
  const user = new User("test@test.com", "password123")
  const browse = user.browseMovies()
  const movieSelection = browse[0]

  user.browseSeats(movieSelection)
  user.reserveSeats(movieSelection)


}

main()

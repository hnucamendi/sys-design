//A user can:
//
//    Search for books by title, author, or genre
//
//    Borrow up to 5 books at a time
//
//    Return borrowed books
//
//An admin can:
//
//    Add/remove books from the library
//
//    Update book details (title, author, stock)
//
//    See current borrowing activity
//
//Books have:
//
//    Title, author, genre, ISBN, total copies, available copies

class User {
  // array of Book
  borrowedBooks = [];
  maxStock = 5;

  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  returnBook(book) {
    const index = this.borrowedBooks.indexOf(book);
    this.borrowedBooks.splice(index, 1);
  }

  borrowBook(book) {
    if (this.borrowedBooks.length >= this.maxStock) {
      throw new Error(
        `User ${this.firstName} ${this.lastName} has reached the max number of books borrowed, please return a book before borrowing another one.`,
      );
    }
    const index = libraryStock.getInstance().stock.find(book);
    if (index < 0) {
      throw new Error("book not found");
    }
    this.borrowedBooks.push(book);
  }

  searchByAuthor(author) {
    return libraryStock.getInstance().stock.find((b) => b.author === author);
  }
  searchByTitle(title) {
    return libraryStock.getInstance().stock.find((b) => b.title === title);
  }
  searchByAuthor(genre) {
    return libraryStock.getInstance().stock.find((b) => b.genre === genre);
  }
}

class Admin extends User {
  constructor(firstName, lastName, email) {
    super(firstName, lastName, email);
  }
  addBook(book, count) {
    libraryStock.getInstance().stock.push({ count, book });
  }
  removeBook(book) {
    const index = libraryStock.getInstance().stock.indexOf({ book });
    if (index < 0) {
      throw new Error(`Book: ${book} not found`);
    }

    libraryStock.getInstance().stock.splice(index, 1);
  }
}

class LibraryStock {
  #instance = null;
  stock = [];
  cosntructor() {
    if (this.#instance) {
      throw new Error("use getInstance() to use Library");
    }
    this.stock = [];
  }

  getInstance() {
    if (!this.#instance) {
      this.#instance = new LibraryStock();
    }
    return this.#instance;
  }
}

class Book {
  constructor(title, author, genre, isbn) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.ISBN = isbn;
  }
}

const libraryStock = new LibraryStock();
function main() {
  const book1 = new Book("book1", "author1", "genre1", "isbn1");
  const book2 = new Book("book2", "author1", "genre1", "isbn1");
  const book3 = new Book("book3", "author1", "genre1", "isbn1");
  const book4 = new Book("book4", "author1", "genre1", "isbn1");
  const book5 = new Book("book5", "author1", "genre1", "isbn1");
  const book6 = new Book("book6", "author1", "genre1", "isbn1");

  const admin = new Admin("Harold", "Nucamendi", "hnucamendi@test.com");
  const user = new User("Biscuit", "Leo", "bleo@test.com");

  admin.addBook(book1);
  const userbook1 = user.searchByTitle("book1");
  user.borrowBook(userbook1);
  user.borrowBook(book2);
  user.borrowBook(book3);
  user.borrowBook(book4);
  user.borrowBook(book5);
  user.returnBook(book1);
  user.borrowBook(book6);
  console.log(user);
}

main();

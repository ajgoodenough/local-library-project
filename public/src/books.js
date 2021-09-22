const { findAccountById } = require("./accounts");

function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  //declare getReturnedBooks and getInStockBooks
  const getReturnedBooks = (books) => {
    return books.filter((book) =>
      book.borrows.every((transaction) => transaction.returned)
    );
  };
  const getInStockBooks = (books) => {
    return books.filter((book) =>
      book.borrows.some((transaction) => !transaction.returned)
    );
  };
  //array of non-returned books
  const inStockBooks = getInStockBooks(books);

  //array of returned books
  const returnedBooks = getReturnedBooks(books);

  const result = [];
  result.push(inStockBooks);
  result.push(returnedBooks);

  //return the full result
  return result;
}

function getBorrowersForBook(book, accounts) {
  //create array of transactions
  const transactions = book.borrows;

  //use map method to add transaction id account info
  const result = transactions.map((transaction) => {
    const accountInfo = findAccountById(accounts, transaction.id);
    const newTransaction = {
      ...transaction,
      ...accountInfo,
    };
    return newTransaction;
  });
  //limit to 10
  result.splice(10);

  //return the current
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

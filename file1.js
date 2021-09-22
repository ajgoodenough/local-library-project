function getTotalBooksCount(books) {
    return books.length;
  }
  
  function getTotalAccountsCount(accounts) {
    return accounts.length;
  }
  
  function getBooksBorrowedCount(books) {
    let total = 0;
    books.forEach((book) => {
      if (!book.borrows[0].returned) {
        total++;
      }
    });
    return total;
  }
  
  function getMostCommonGenres(books) {
    //make new array of most common genres, reduce()
    const result = books.reduce((total, book) => {
  
      //find genre of current book
      const genre = book.genre;
  
      //find the object in accum that has "name === genre"
      const genreInfo = total.find((element) => element.name === genre);
  
      //if no object found, create new obj and push it into accum
      if (!genreInfo) {
        const newGenreInfo = {
          name: genre,
          count: 1,
        };
        total.push(newGenreInfo);
  
      } else {
        //if object was located, then add 1 to count
        genreInfo.count++
      }
      return total;
    }, []);
  
    result.sort((genreA, genreB) => genreB.count - genreA.count);
    //limit to 5
    result.splice(5)
    return result;
  }
  
  function getMostPopularBooks(books) {
    //make new array of most popular books with map method
    const result = books.map((book) => {
      const popularityInfo  = {
        name: book.title,
        count: book.borrows.length,
      };
      return popularityInfo;
    });
    //sort method for new array by count, greatest to least
    result.sort((titleA, titleB) => titleB.count - titleA.count);
  
    //limit to 5
    result.splice(5);
    return result;
  }
  
  function getMostPopularAuthors(books, authors) {
    //make new array of authors by popularity, map()
    const result = authors.map((author) => {
      const fullName = `${author.name.first} ${author.name.last}`;
      const booksByAuthor = getBooksByAuthorId(books, author.id);
      const totalBorrows = booksByAuthor.reduce((accum, book) => accum + book.borrows.length, 0);
      const newAuthorInfo = {
        name: fullName,
        count: totalBorrows,
      };
      return newAuthorInfo;
    });
    //sort new array by count; +/-
    result.sort((authorA, authorB) => authorB.count - authorA.count);
  
    //limit to 5
    result.splice(5)
    return result;
  }
  
  module.exports = {
    getTotalBooksCount,
    getTotalAccountsCount,
    getBooksBorrowedCount,
    getMostCommonGenres,
    getMostPopularBooks,
    getMostPopularAuthors,
  };
  
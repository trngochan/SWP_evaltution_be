const db = require('../common/connect');

const Book = function (book) {
  this.id = book.id;
  this.name = book.name;
  this.image = book.image;
  this.author = book.author_id;
};

Book.get_all = function (result) {
  db.query(`SELECT * from books`, function (err, book) {
    if(err) {
        result(err);
        return;
    }
    result(book)
  })
};

Book.getByID = function (id, result) {
    db.query(`SELECT * from books where id = ${id}`, function (err, book) {
        if(err || book.length == 0) {
            result(null);
        }

        result(book[0]);
      })
};

Book.create = function (data, result) {
    db.query('INSERT INTO books set ? ', data, function (err, book) {
        if(err) {
            result(null);
        }

        result({id: book.insertId, ...data});
    })
  };

Book.remove = function (id, result) {
    db.query(`DELETE FROM books WHERE id = ${id}`, function (err, book) {
        if(err) {
            result(null);
            return
        }

        result("xoa thanh cong");
    })
};

Book.update = function (b, result) {
    console.log();
    db.query('UPDATE books set name = ?, image = ?, author_id = ? where id = ?', [b.name, b.image, b.author_id, b.id],
    function (err, book) {
        if(err) {
            console.log(err);
            result(null);
            return;
        }

        result(b);
    })
};

module.exports = Book;

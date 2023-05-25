const Book = require("../models/book.model");

exports.get_list = function (req, res) {
  Book.get_all(function (data) {
    res.send({ result: data });
  });
};

exports.detail = function (req, res) {
    Book.getByID(req.params.id, function (respone) {
        console.log(respone);
        res.send({ result: respone });
    })
};

//bode-parser
exports.add_book = function (req, res) {
    var data = req.body;
    Book.create(data, function(respone) {
        res.send({ result: respone });
    })
}

exports.remove_book = function (req, res) {
    var id = req.params.id;
    Book.remove(id, function(respone) {
        res.send(respone);
    })
}

exports.update_book = function (req, res) {
    var data = req.body;
    Book.update(data, function(respone) {
        res.send(respone);
    })
}
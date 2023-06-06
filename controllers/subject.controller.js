const Subject = require("../models/subject.model");

exports.getAll = function (req, res) {
    Subject.getAll((result)=>{
        res.send(result);
    })
}
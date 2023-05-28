const Teacher = require("../models/teacher.model");

exports.getAll = function (req, res) {
    Teacher.getAll((result)=>{
        res.send(result);
    })
}
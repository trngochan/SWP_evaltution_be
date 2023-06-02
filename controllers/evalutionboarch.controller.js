const Evalution = require("../models/evalutionboarch.model");

exports.getAll = function (req, res) {
    Evalution.getAll((result)=>{
        res.send(result);
    })
}

exports.getByTeacherId = function (req, res) {
    const teacherId = req.params.teacher;
    Evalution.getByTeacherId(teacherId,(result)=>{
        res.send(result);
    })
}

exports.getByStdIdAndCourId = function (req, res) {
    const courId = req.cookies.course_id;
    const stdId = JSON.parse( req.cookies.user).id;
    Evalution.getByStdIdAndCourId(courId,stdId)
}
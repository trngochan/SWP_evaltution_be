const Course = require("../models/course.model");

exports.getByStudentID = function (req, res) { 
    const studentId = req.params.student; 
    Course.getByStuentID(studentId, (result) => {
        res.send(result)
    })
}
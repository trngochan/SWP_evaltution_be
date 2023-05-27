const Student = require("../models/student.model");

exports.getAll = function (req, res) {
    Student.getAll((result)=>{
        res.send(result);
    })
}

exports.getByProjectId = function (req, res) {
    const projectId = req.params.project;
    Student.getByProjectId(projectId ,(result)=>{
        res.send(result);
    })
}

exports.getByCourseId = function (req, res) {
    const courseId = req.params.course;
    Student.getByProjectId(courseId ,(result)=>{
        res.send(result);
    })
}

exports.getById = function (req, res) {
    const studentId = req.params.student;
    Student.getById(studentId ,(result)=>{
        res.send(result);
    })
}
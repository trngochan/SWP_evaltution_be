const Project = require("../models/project.model");

exports.getById = function (req, res) {
    const projectId = req.params.project;
    Student.getById(projectId,(result)=>{
        res.send(result);
    })
}

exports.getAll = function (req, res) {
    Project.getAll((result)=>{
        res.send(result);
    })
}

exports.getByEvalutionId =  function (req, res) {
    const evalutionId = req.params.evalution;
    Project.getByEvalutionId(evalutionId, (result)=>{
        res.send(result);
    })
}

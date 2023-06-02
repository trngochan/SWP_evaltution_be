const scoreColumn = require("../models/scoreColumn.model");

exports.getByTemplateId = function (req, res) {
    const id = req.params.template;
    scoreColumn.getByTemplateId(id,(result)=>{
        res.send(result);
    })
}

exports.getBySubjectId = function (req, res) {
    const id = req.params.subject;
    scoreColumn.getBySubjectId(id,(result)=>{
        res.send(result);
    })
}
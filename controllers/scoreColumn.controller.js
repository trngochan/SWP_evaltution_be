const scoreColumn = require("../models/scoreColumn.model");

exports.getByTemplateId = function (req, res) {
    const id = req.params.template;
    scoreColumn.getByTemplateId(id,(result)=>{
        res.send(result);
    })
}
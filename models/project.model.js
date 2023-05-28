const db = require("../common/connect");

const Project = function(project) {
    this.id = project.id,
    this.name = project.name,
    this.notion = project.notion
}

Project.getAll = function(cb) {
    try {
        db.query("SELECT * FROM project", (err, result) => {
            if (err) {
                cb(err);
            } else {
                cb(result);
            }
        })
    } catch (error) {
        cb(error);
    }
}

Project.getById = function(id, cb) {
    try {
        db.query("SELECT * FROM project WHERE id =?", [id], (err, result) => {
            if (err) {
                cb(err);
            } else {
                cb(result);
            }
        })
    } catch (error) {
        cb(error);
    }
}

Project.getByEvalutionId = function(id, cb) {
    try {
        db.query("SELECT * FROM projectinboard WHERE EvaluationBoardId = ?", [id], (err, result) => {
            if (err) {
                cb(err);
            } else {
                cb(result);
            }
        })
    } catch (error) {
        cb(error);
    }
}

module.exports = Project;
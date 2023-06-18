const Project = require("../models/project.model");
const Score = require("../models/score.model");

exports.getById = function (req, res) {
  const projectId = req.params.project;
  Project.getById(projectId, (result) => {
    res.send(result);
  });
};

exports.add = function (req, res) {
  const data = req.body;
  Project.add(data, (result) => {
    res.send(result);
  });
};

exports.update = function (req, res) {
  const data = req.body;
  Project.update(data, (result) => {
    res.send(result);
  });
};

exports.getProjectNoHasBoard = async function (req, res) {
  const board = req.params.board;
  const data = await Project.getProjectNoHasBoard(board);
  res.json(data);
};

exports.getAll = function (req, res) {
  Project.getAll((result) => {
    res.send(result);
  });
};

exports.getByEvalutionId = function (req, res) {
  const evalutionId = req.params.evalution;
  Project.getByEvalutionId(evalutionId, (result) => {
    res.send(result);
  });
};

exports.getIDStdInCourseByCourseIdAndStdId = function (req, res) {
  const courseId = req.params.course;
  const studentId = req.cookies.user.id;
  Project.getIDStdInCourseByCourseIdAndStdId(courseId, studentId, (result) => {
    res.send(result);
  });
};

exports.calAvareScore = async function (req, res) {
  const project = req.params.project;
  const stdinprjs = await Project.getStdInProIdById(project);
  for (let i = 0; i < stdinprjs.length; i++) {
    Score.calAvgScoreBystdInPrj(stdinprjs[i]?.Id, (result) => {
      console.log(stdinprjs.length);
      if (i + 1 === stdinprjs.length) return res.send(result);
    });
  }
};

exports.getByCourse = function (req, res) {
  const course = req.params.course;
  Project.getByCourseId(course, (result) => {
    res.send(result);
  });
};

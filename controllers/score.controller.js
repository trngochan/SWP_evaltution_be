const Project = require("../models/project.model");
const Score = require("../models/score.model");

exports.insertScore = function (req, res) {
  const data = req.body;
  const dataInfor = [
    data.courseID,
    data.score.stdinprjId,
    data.lectureinboardId,
  ];

  delete data.lectureinboardId;
  delete data.courseID;
  delete data.score.stdinprjId;

  Score.insertScore(dataInfor, data.score, (result) => {
    res.send(result);
  });
};

exports.deleteByID = function (req, res) {
  const id = req.params.id;
  Score.deleteByID(id, (result) => {
    res.send(result);
  });
};

exports.getByScore = function (req, res) {
  const id = req.params.id;
  Score.getByScore(id, (result) => {
    res.send(result);
  });
};

exports.updateScore = function (req, res) {
  const data = req.body;
  Score.updateScore(data, (result) => {
    res.send(result);
  });
};

exports.getByLiBStdPrj = function (req, res) {
  const { lib, std, prj } = req.params;
  console.log(lib, std, prj);
  Score.getByLiBStdPrj(lib, std, prj, (result) => {
    res.send(result);
  });
};

exports.calAvgScoreBystdInPrj = function (req, res) {
  const stdinprj = req.params.stdinprj;
  Score.calAvgScoreBystdInPrj(stdinprj, (result) => {
    res.send(result);
  });
};

// exports.getScore = async function (req, res) {
//     try {
//       const userCookie = req.cookies.user;
//       const userObject = JSON.parse(userCookie);
//       const studentId = userObject.id;
//       const courseId = req.params.course;

//       const studentinproject = await Project.getIDStdInCourseByCourseIdAndStdId(courseId, studentId);

//       console.log(studentinproject);
//       // Score.getScore(studentinproject, (result) => {
//       //   res.send(result);
//       // });
//     } catch (err) {
//       console.log(err);
//       // Xử lý lỗi
//     }
//   };

exports.getScore = async function (req, res) {
  try {
    const { id, courseId } = req.body;

    Score.getScore(id, courseId, (result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    // Xử lý lỗi
  }
};

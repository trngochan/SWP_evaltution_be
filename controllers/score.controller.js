const Project = require("../models/project.model");
const Score = require("../models/score.model");

exports.insertScore = function (req, res) {
  const dataScores = req.body;
  const data = [
    req.cookies.course_id,
    dataScores.stdinprjId,
    req.cookies.lectureinboard_id,
  ];
  delete dataScores.stdinprjId;
  Score.insertScore(dataScores, data, (result) => {
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
    const userCookie = req.cookies.user;
    const userObject = JSON.parse(userCookie);
    const studentId = userObject.id;
    const courseId = req.params.course;
  
    const studentinproject = await Project.getIDStdInCourseByCourseIdAndStdId(courseId, studentId);
  
    Score.getScore(studentinproject, (result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    // Xử lý lỗi
  }
};

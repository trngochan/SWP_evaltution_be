module.exports = function (router) {
  const teacherController = require("../controllers/teacher.controller");

  router.get("/teacher/getall", teacherController.getAll);
  router.get(
    "/teacher/:lectureInBoard/linb",
    teacherController.getByLectureInBoard
  );
  router.get("/teacher/courAndStd", teacherController.getByStdIdAndCourId);
  router.get(
    "/teacher/:project/quaninboard",
    teacherController.getQuanlityOfBoarnd
  );
  router.get(
    "/teacher/:project/quanmarked",
    teacherController.getQuanMarkedOfBoarnd
  );
  router.post("/teacher/add", teacherController.add);
  router.get("/teacher/:board/notinboard", teacherController.getNotIntBoard);
  // router.get('/student/:project/project', teacherController.getByProjectId);
  // router.get('/student/:course/course', teacherController.getByCourseId);
  // router.get('/student/:student/student', teacherController.getById);
};

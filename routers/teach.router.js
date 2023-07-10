const auth = require("../common/_AUTH");

module.exports = function (router) {
  const teacherController = require("../controllers/teacher.controller");

  router.get("/teacher/getall", teacherController.getAll);
  router.get("/teacher/:id", teacherController.getById);
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
  router.delete("/teacher/:teacher/delete", teacherController.deleteTeacher);
  router.put("/teacher/edit", teacherController.editTeacher);
  router.post("/teacher/add", teacherController.add);
};

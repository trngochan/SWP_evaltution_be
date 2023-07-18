module.exports = function (router) {
  const courseController = require("../controllers/course.controller");

  router.get("/course/:student/student", courseController.getByStudentID);
  router.get("/course/:teacher/teacher", courseController.getByTeacherID);
  router.post("/course/add", courseController.add);
  router.get("/course/getall", courseController.getAll);
  router.get("/course/:course/getbyid", courseController.getByID);
  router.get("/course/:subject/getbysubject", courseController.getBySubject);
  router.get("/course/:sem/:sub", courseController.getBySemSub);
  router.delete("/course/:id", courseController.deleteByID);
};

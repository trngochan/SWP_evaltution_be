module.exports = function (router) {
  const studentController = require("../controllers/student.controller");

  router.get("/student/getall", studentController.getAll);
  router.get("/student/:project/project", studentController.getByProjectId);
  router.get("/student/:course/course", studentController.getByCourseId);
  router.get(
    "/student/:course/nothaveproject",
    studentController.getByNohasProject
  );
  router.get("/student/:student/student", studentController.getById);
  router.post("/student/add", studentController.add);
  router.get("/student/:project/getstdinprj", studentController.getStdNotInPrj);
  router.get(
    "/student/:course/getstdnotinproject",
    studentController.getStdInCourNotInProject
  );
  router.get(
    "/student/:course/getstdnotincour",
    studentController.getStdNotInCour
  );
  router.put("/student/edit", studentController.update);
  router.delete("/student/:id", studentController.deleteByID);
};

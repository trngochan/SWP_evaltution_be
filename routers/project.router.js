const auth = require("../common/_AUTH");

module.exports = function (router) {
  const projectController = require("../controllers/project.controller");

  router.get("/project/getall", projectController.getAll);
  router.get("/project/:project/getbyid", projectController.getById);
  router.get(
    "/project/:evalution/evalution",
    projectController.getByEvalutionId
  );
  router.get(
    "/project/:course/course",
    projectController.getIDStdInCourseByCourseIdAndStdId
  );
  router.get(
    "/project/:course/projectincourses",
    projectController.getByCourse
  );
  router.post("/project/add", projectController.add);
  router.post("/project/:project/public", projectController.calAvareScore);
  router.get(
    "/project/:board/projectsnoboard",
    projectController.getProjectNoHasBoard
  );
};

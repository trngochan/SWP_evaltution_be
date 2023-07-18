module.exports = function (router) {
  const studentInCourseController = require("../controllers/studentincourse.controller");

  router.post("/studentincourse/add", studentInCourseController.add);
  router.delete("/studentincourse/:id", studentInCourseController.deleteByID);
};

module.exports = function (router) {
  const semesterController = require("../controllers/semester.controller");

  router.get("/semester/getall", semesterController.getAll);
  router.post("/semester/add", semesterController.add);
  router.get("/semester/:id", semesterController.getById);
  router.delete("/semester/:id", semesterController.deleteByID);
};

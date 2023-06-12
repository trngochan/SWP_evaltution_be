module.exports = function (router) {
  const avalutionController = require("../controllers/evalutionboarch.controller");

  router.get("/evalution/getall", avalutionController.getAll);
  router.get("/evalution/:teacher/teacher", avalutionController.getByTeacherId);
  router.post("/evalution/add", avalutionController.add);
};

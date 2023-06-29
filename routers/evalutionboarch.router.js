module.exports = function (router) {
  const avalutionController = require("../controllers/evalutionboarch.controller");

  router.get("/evalution/getall", avalutionController.getAll);
  router.get("/evalution/:teacher/teacher", avalutionController.getByTeacherId);
  router.get("/evalution/:board", avalutionController.getById);
  router.post("/evalution/add", avalutionController.add);
  router.get(
    "/evalution/:project/getbyproject",
    avalutionController.getByProjectId
  );
};

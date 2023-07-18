module.exports = function (router) {
  const templateController = require("../controllers/template.controller");

  router.get("/template/getall", templateController.getAll);
  router.get("/template/:id", templateController.getById);
  router.post("/template/add", templateController.add);
  router.delete("/template/:id", templateController.deleteByID);
};

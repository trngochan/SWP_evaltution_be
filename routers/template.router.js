module.exports = function (router) {
  const templateController = require("../controllers/template.controller");

  router.get("/template/getall", templateController.getAll);
  router.post("/template/add", templateController.add);
};

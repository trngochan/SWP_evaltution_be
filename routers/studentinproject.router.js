module.exports = function (router) {
  const stdInProjectController = require("../controllers/studentinproject.controller");

  router.post("/studentinproject/add", stdInProjectController.add);
  router.delete(
    "/studentinproject/:stdinprj/remove",
    stdInProjectController.remove
  );
};

module.exports = function (router) {
  const lectureinboardController = require("../controllers/lectureinboard.controller");

  router.post("/lectureinboard/add", lectureinboardController.add);
  router.delete("/lectureinboard/:id", lectureinboardController.deleteByID);
};

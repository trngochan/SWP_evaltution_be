module.exports = function (router) {
  const ProjectInBoardController = require("../controllers/ProjectInBoard.controller");

  router.post("/projectinboard/insert", ProjectInBoardController.insert);
  router.delete("/projectinboard/:id", ProjectInBoardController.deleteByID);
};

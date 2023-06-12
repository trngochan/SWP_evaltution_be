module.exports = function (route) {
  const ProjectInBoardController = require("../controllers/ProjectInBoard.controller");

  route.post("/projectinboard/insert", ProjectInBoardController.insert);
};

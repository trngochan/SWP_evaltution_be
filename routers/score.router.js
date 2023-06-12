module.exports = function (router) {
  const scoreController = require("../controllers/score.controller");

  router.post("/score/insert", scoreController.insertScore);
  router.post("/score/get", scoreController.getScore);
  router.get(
    "/score/:stdinprj/calAvgScore",
    scoreController.calAvgScoreBystdInPrj
  );
};

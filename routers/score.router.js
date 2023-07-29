module.exports = function (router) {
  const scoreController = require("../controllers/score.controller");

  router.post("/score/insert", scoreController.insertScore);
  router.post("/score/get", scoreController.getScore);
  router.get(
    "/score/:stdinprj/calAvgScore",
    scoreController.calAvgScoreBystdInPrj
  );
  router.get("/score/:lib/:std/:prj", scoreController.getByLiBStdPrj);
  router.put("/score/update", scoreController.updateScore);
  router.delete("/score/:id", scoreController.deleteByID);
  router.get("/score/:id/course", scoreController.getByScore);
};

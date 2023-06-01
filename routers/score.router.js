module.exports= function(router) {
    const scoreController = require('../controllers/score.controller');

    router.post('/score/insert', scoreController.insertScore);
}
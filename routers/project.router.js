module.exports= function(router) {
    const projectController = require('../controllers/project.controller');

    router.get('/project/getall', projectController.getAll);
    router.get('/project/:evalution/evalution', projectController.getByEvalutionId);
}
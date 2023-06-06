module.exports = function(router) {
    const subjectController = require('../controllers/subject.controller');

    router.get('/subject/getAll', subjectController.getAll);
}
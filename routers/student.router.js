module.exports= function(router) {
    const studentController = require('../controllers/student.controller');

    router.get('/student/getall', studentController.getAll);
    router.get('/student/:project/project', studentController.getByProjectId);
    router.get('/student/:course/course', studentController.getByCourseId);
    router.get('/student/:student/student', studentController.getById);
}
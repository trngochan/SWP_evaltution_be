module.exports= function(router) {
    const avalutionController = require('../controllers/evalutionboarch.controller');

    router.get('/evalution/getall', avalutionController.getAll);
    router.get('/evalution/:teacher/teacher', avalutionController.getByTeacherId);
    // router.get('/student/:project/project', teacherController.getByProjectId);
    // router.get('/student/:course/course', teacherController.getByCourseId);
    // router.get('/student/:student/student', teacherController.getById);
}
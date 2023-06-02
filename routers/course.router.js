module.exports = function(router) {
    const courseController = require('../controllers/course.controller');

    router.get('/course/:student/student', courseController.getByStudentID)
}

module.exports= function(router) {
    const loginController = require('../controllers/login.controller');
    
    router.post('/loginstudent', loginController.loginStudent);
    router.post('/loginteacher', loginController.loginTeacher);
    router.post('/loginadmin', loginController.loginAdmin);
}
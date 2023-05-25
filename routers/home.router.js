
module.exports= function(router) {
    const homeController = require('../controllers/home.controller');
    
    router.get('/', homeController.home);
    router.post('/loginstudent', homeController.loginStudent);
    router.post('/loginteacher', homeController.loginTeacher);
    // router.post('/loginstudent', homeController.loginAdmin);
}
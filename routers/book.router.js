module.exports = function(router) {
    const bookController = require('../controllers/book.controller');

    router.get('/book/list', bookController.get_list);
    
    router.get('/book/about/:id', bookController.detail);

    router.post('/book/add', bookController.add_book);

    router.delete('/book/remove/:id', bookController.remove_book);

    router.put('/book/update', bookController.update_book);

}
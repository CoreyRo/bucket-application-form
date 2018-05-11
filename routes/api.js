const bucketApp = require('../controllers/bucketController.js')

module.exports = function (router) {
    router
        .route('/api/new-post')
        .post(bucketApp.newPost)
    router
        .route('/api/step/:num')
        .post(bucketApp.updatePost)

    router
        .route('/api/submit-app')
        .post(bucketApp.submit)

    router
        .route('/api/find/:num')
        .get(bucketApp.findOne)

    router
        .route('/api/save-edit/:num')
        .put(bucketApp.saveEdit)

    router
        .route('/api/first-submit')
        .post(bucketApp.firstSubmit)
}
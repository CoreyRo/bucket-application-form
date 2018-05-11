const bucketApp = require('../controllers/bucketController.js')

module.exports = function(router){
    router
        .route('/api/new-post')
        .post(bucketApp.newPost)
    router
        .route('/api/step/:num')
        .post(bucketApp.updatePost)
    // router
    //     .route('/api/education')
    //     .post(bucketApp.update)
    // router
    //     .route('/api/experience')
    //     .post(bucketApp.update)
    // router
    //     .route('/api/additonaltext')
    //     .post(bucketApp.update)
}
const db = require("../models")

module.exports = function (router) {
    router
        .get('/', function (req, res, next) {
            res.render('start', {
                title: 'Bucket Application Form',
                pageTitle: "App Form",
                progress: 0,
                part1: true,
                formAction: '/api/inital-post',
                form: true,
                submitted: false,
            })
        })

        router
        .get('/initial-form', function (req, res, next) {
            res.render('start', {
                title: 'Bucket Application Form',
                pageTitle: "App Form",
                progress: 0,
                init: true,
                formAction: '/api/inital-post',
            })
        })

    router
        .get('/next-step', function (req, res, next) {
            res.render('home', {
                title: 'Bucket Application Form',
                pageTitle: "App Form",
                progress: 0,
                part1: true,
                formAction: '/api/new-post',
                form: true,
                submitted: false,
            })
        })

    router.get('/step/:num/:id', function (req, res, next) {
        let i = (parseInt(req.params.num) - 2)
        let stepArray = [
            {
                rte: 'coverPageText',
                rteName: 'Cover letter'
            }, {
                rte: 'education',
                rteName: 'Education'
            }, {
                rte: 'experience',
                rteName: 'Experience'
            }, {
                rte: 'additionalText',
                rteName: 'Additional Text'
            }
        ]
        res.render('home', {
            title: `Bucket Application Step ${req.params.num}`,
            pageTitle: "App Form",
            progress: ((parseInt(req.params.num) / 5) * 100),
            part1: false,
            formAction: `/api/step/${i}`,
            rte: stepArray[i].rte,
            rteName: stepArray[i].rteName,
            step: (parseInt(req.params.num) + 1),
            id: req.params.id,
            form: true,
            submitted: false,
        })
    })

    router.get('/preview/:id', function (req, res, next) {
        db
            .Bucket
            .findOne({_id: req.params.id})
            .then(function (dbModel) {
                console.log("DBMODEL preview", dbModel)
                res.render('preview', {
                    title: 'Bucket Application Form',
                    pageTitle: "App Form",
                    data: dbModel,
                    form: false,
                    submitted: false,
                })
            })
    })

    router.get('/application-submitted/:id', function (req, res, next) {
        db
            .Bucket
            .findOne({_id: req.params.id})
            .then(function (dbModel) {
                console.log("DBMODEL FIND", dbModel)
                res.render('preview', {
                    title: 'Bucket Application Form',
                    pageTitle: "App Form",
                    data: dbModel,
                    form: false,
                    submitted: true,
                })
            })
    })

    router.get('/edit/:id', function (req, res, next) {
        db
            .Bucket
            .findOne({_id: req.params.id})
            .then(function (dbModel) {
                console.log("DBMODEL FIND EDIT", dbModel)
                res.render('edit', {
                    title: 'Edit Application',
                    pageTitle: "Edit",
                    data: dbModel,
                })
            })
    })
}
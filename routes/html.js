const db = require("../models")

module.exports = function (router) {
    router
        .get('/', function (req, res, next) {
            res.render('home', {
                title: 'Bucket Application Form',
                pageTitle: "App Form",
                progress: 0,
                part1: true,
                formAction: '/api/new-post',
                form: true
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
            form: true
        })
    })

    router.get('/preview/:id', function (req, res, next) {
        db
        .Bucket
        .findOne({_id: req.params.id})
        .then(function (dbModel) {
            console.log("DBMODEL FIND", dbModel)
            res.render('home', {
                title: 'Bucket Application Form',
                pageTitle: "App Form",
                progress: 0,
                part1: true,
                data: dbModel,
                form: false
            })
        })
    })
}
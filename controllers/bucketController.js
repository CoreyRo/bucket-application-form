const db = require('../models')
const path = require('path');
const nl2br = require('nl2br');
const fs = require('fs')
const updateModel = require('./updateModel')

module.exports = {
    newPost: function (req, res) {
        console.log('req', req.body)
        let {
            position,
            portfolioUrl,
            resumeUrl,
            firstName,
            lastName,
            email,
            phone
        } = req.body
        db
            .Bucket
            .create({
                FirstName: firstName,
                LastName: lastName,
                EmailAddress: email,
                PhoneNumber: phone,
                Position: position,
                PortfolioUrl: portfolioUrl,
                ResumeUrl: resumeUrl
            })
            .then(function (dbModel) {
                console.log("DB MODEL", dbModel)
                res.redirect(`/step/2/${dbModel._id}`)
            })
            .catch(function (err) {
                console.log("DB ERR", err)
                res.render('home', {error: err})
            })
    },

    updatePost: function (req, res) {
        if (parseInt(req.body.step) < 6) {
            updateModel(req, function (data) {
                console.log("REQ", req.body)
                console.log("PARAMS", req.params)
                let step = (parseInt(req.body.step))
                let id = req.body._id
                console.log("Data", data)
                db
                    .Bucket
                    .findOneAndUpdate({
                        _id: id
                    }, data)
                    .then(function (dbModel) {
                        console.log("DB MODEL", dbModel)
                        res.redirect(`/step/${step}/${dbModel._id}`)
                    })
                    .catch(function (err) {
                        console.log("DB ERR", err)
                        res.render('home', {error: err})
                    })
            })
        } else {
            console.log("DONE!!!!!!!!!!!!!", req.body._id)
            db
                .Bucket
                .findOneAndUpdate({
                    _id: req.body._id
                }, {AdditionalText: req.body.additionalText})
                .then(function (dbModel) {
                    console.log("DBMODEL FIND", dbModel)
                    res.redirect(`/preview/${dbModel._id}`)
                })
        }

        // updateData[step.db] = req.body.s console.log('req', step) let {} = req.body
        // db     .Bucket     .findByIdAndUpdate({_id:id})     .then(function (dbModel)
        // {         console.log("DB MODEL", dbModel)         res.render('preview') })
        // .then(function (err) {         console.log("DB ERR", err) res.render('home',
        // {error: err})     })
    },

    postIt: function (req, res, next) {
        console.log("Posted!")
        res.redirect("/")
    }
}
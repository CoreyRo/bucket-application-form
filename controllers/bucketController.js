const db = require('../models')
const path = require('path');
const nl2br = require('nl2br');
const fs = require('fs')
const updateModel = require('./updateModel')
const axios = require('axios')

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

    findOne: function(req, res){
        db.Bucket
            .findOne({_id:req.params.num})
            .then(result => res.json(result))
            .catch(err => res.json(err))
    },

    saveEdit: function(req,res){
        console.log("req.body", req.body)
        db.Bucket
            .findOneAndUpdate({_id: req.params.num}, {
                Position: req.body.Position,
                PortfolioUrl: req.body.PortfolioUrl,
                ResumeUrl: req.body.ResumeUrl,
                CoverPageText: req.body.CoverPageText,
                Education: req.body.Education,
                Experience: req.body.Experience,
                AdditionalText: req.body.AdditionalText
            })
            .then(function (dbModel) {
                res.redirect(`/preview/${dbModel._id}`)
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
    },

    submit: function (req, res, next) {
        axios
            .post(`https://apply.bucketthechange.com/api/application/${req.body.buttonAppId}`, {
                Position: req.body.Position,
                PortfolioUrl: req.body.PortfolioUrl,
                ResumeUrl: req.body.ResumeUrl,
                CoverPageText: req.body.CoverPageText,
                Education: req.body.Education,
                Experience: req.body.Experience,
                AdditionalText: req.body.AdditionalText
            })
            .then((response) => {
                console.log("response", response.data)
                res.redirect(`/application-submitted/${req.body.modelId}`)
            })
            .catch(function (err) {
                if (err) 
                    throw err
                return console.log("err", err)
            })

    },

    finalSubmit: function(req, res, next){
        axios.post(`https://apply.bucketthechange.com/api/submitApplication/${req.body.buttonAppId}`,{
            Position: req.body.Position,
            PortfolioUrl: req.body.PortfolioUrl,
            ResumeUrl: req.body.ResumeUrl,
            CoverPageText: req.body.CoverPageText,
            Education: req.body.Education,
            Experience: req.body.Experience,
            AdditionalText: req.body.AdditionalText
        })
        .then((response) => {
            console.log("response", response.data)
            res.redirect(`/done`)
        })
        .catch(function (err) {
            if (err) 
                throw err
            return console.log("err", err)
        })
    },

    firstSubmit: function(req, res, next){
        axios.post(`https://apply.bucketthechange.com/api/applicant`, {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            EmailAddress: req.body.EmailAddress,
            PhoneNumber: req.body.PhoneNumber,
        })
        .then(function(result){
            res.redirect('/next-step')
        })
        .catch(function(err){
            res.redirect('/')
        })
    }
}
'use strict'

//Server.js for node.js web app: bucket_application
//Author: Corey Rodems

//Dependencies
const express = require('express'),
    exphbs = require('express-handlebars'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    logger = require('morgan'),
    path = require('path'),
    bodyParser = require('body-parser'),
    env = require('dotenv').load(),
    app = express(),
    PORT = process.env.PORT || 3000


//Mongoose Setup
// = Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose
    .connect(process.env.MONOGDB_LOCALHOST || process.env.MONGO_MLAB)
    .catch(function (err) {
        console.log('mongoose connect error:', err.message)
    })
    // When successfully connected
    mongoose
    .connection
    .on('connected', function () {
        process.env.NODE_ENV === 'production'
            ? console.log(`Mongoose default connection open to process.env.MONGO_MLAB`)
            : console.log(`Mongoose default connection open to process.env.MONGODB_LOCALHOST`);
    });
// If the connection throws an error
mongoose
    .connection
    .on('error', function (err) {
        console.log(`Mongoose default connection error: ${err}`);
    });
// When the connection is disconnected
mongoose
    .connection
    .on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    mongoose
        .connection
        .close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
});


//Setup express-handlebars instance
const hbs = exphbs.create({
        defaultLayout: 'main',
        helpers: {
            foo: () => 'bar',
            hello: () => 'world'
        }
    }
)

//Handlebars view engine setup
app.engine('handlebars', hbs.engine)
app.set('view engine', '.handlebars')
//Handlebars default config
const partialsDir = `${__dirname}/views/partials`

//express app setup
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, 'public')))


require("./routes/html.js")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req
        .app
        .get('env') === 'development'
        ? err
        : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error', {title: 'ERROR 404'});
});

//Run and listen
app.listen(PORT, function(){
    console.log(`Bucket Application Poster listening on PORT ${PORT}`)
})


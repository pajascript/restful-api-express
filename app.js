"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose_1 = require("mongoose");
var bookRouter_1 = require("./routes/bookRouter");
var app = express();
mongoose_1.default
    .connect('mongodb://127.0.0.1/bookApi')
    .then(function () {
    console.log('MongoDB connected successfully');
    app.listen(port, function () {
        console.log("Server Running on port ".concat(port));
    });
})
    .catch(function (err) {
    console.log('MongoDB Connection Error. ', err);
});
var port = process.env.PORT || 3000;
app.use(express.json());
app.use('/api', bookRouter_1.default);
app.get('/', function (req, res) {
    res.send('Welcome to my API.');
});

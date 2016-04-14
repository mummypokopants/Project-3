
'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const carparkSchema = new Schema({
    address: String,
    type: String,
    weekday7amto1030pm: String,
    weekday1030pmto7am: String,
    Saturday7amto1030pm: String,
    Saturday1030pmto7am: String,
    Sunday7amto1030pm: String,
    Sunday1030pmto7am: String
});




module.exports = mongoose.model('Carpark', carparkSchema);

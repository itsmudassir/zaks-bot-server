const mongoose = require("mongoose");

const botRunIntervalsSchema = new mongoose.Schema({
    name: String,
    fromTime: String,
    toTime: String,
    numberOfRuns: Number
});


const botRunIntervalsModel = mongoose.model("botRunInterval", botRunIntervalsSchema);
module.exports = { botRunIntervalsModel };
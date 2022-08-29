const mongoose = require("mongoose");

const botStatusSchema = new mongoose.Schema({
    name: String,
    state: Boolean
});

const botStateModel = mongoose.model("botState", botStatusSchema);
module.exports = {botStateModel};
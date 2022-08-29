const mongoose = require("mongoose");

const targetDomainSchema = new mongoose.Schema({
    name: String,
    url: String,
});

const targetDomainModel = mongoose.model("targetDomain", targetDomainSchema);
module.exports = {targetDomainModel};
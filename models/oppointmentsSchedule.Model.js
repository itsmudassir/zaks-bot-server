const mongoose = require("mongoose");

const appointmentsScheduleSchema = new mongoose.Schema({
    time: String,
    status: String,
    date: Date,
    patient: String,
    appointmentdateTime: Date
});


const appointmentsScheduleModel = mongoose.model("appointmentsSchedule", appointmentsScheduleSchema);
module.exports = { appointmentsScheduleModel };
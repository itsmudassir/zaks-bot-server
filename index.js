const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
var cors = require('cors');
const port = process.env.PORT || 7777;
const { connectMongoDB } = require("./config/mongoDb.Config.js");
const { botStateModel } = require("./models/botState.Model.js");
const { targetDomainModel } = require("./models/targetDomain.Model.js");
const { botRunIntervalsModel } = require("./models/botRunIntervals.Model.js");
const { appointmentsScheduleModel } = require("./models/oppointmentsSchedule.Model.js");


connectMongoDB();
app.use(cors());
app.use(express.json());


app.get("/botStatus", async (req, res) => {
    try {
        const response = await botStateModel.findOne({ name: "botStatus" })
        res.status(200).send(response);
    } catch (err) {
        console.log("error occoured while getting botStatus", err);
        res.status(500).json({ errorMsg: "Server Error" })
    }
});

app.patch("/botStatus-update", async (req, res) => {
    try {
        const { name, state } = req.body;
        const query = { name: name };
        const update = { state: state };
        const options = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        }
        const response = await botStateModel.findOneAndUpdate(query, update, options);
        res.status(200).send(response);
    } catch (err) {
        console.log("error occoured while updating/creating  botStatus", err);
        res.status(500).json({ errorMsg: "Server Error" })
    }
});


app.get("/targetDomain", async (req, res) => {
    try {
        const response = await targetDomainModel.findOne({ name: "targetDomain" })
        res.status(200).send(response);
    } catch (err) {
        console.log("error occoured while getting botStatus", err);
        res.status(500).json({ errorMsg: "Server Error" })
    }
});

app.patch("/targetDomain-update", async (req, res) => {
    try {
        const { url, name } = req.body;
        const query = { name: name };
        const update = { url: url };
        const options = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        }
        const response = await targetDomainModel.findOneAndUpdate(query, update, options);
        res.send(response);
    } catch (err) {
        console.log("error occoured while updating/creating  targetDomain", err);
        res.status(500).json({ errorMsg: "Server Error" })
    }
});

app.patch("/botRunIntervals-update", async (req, res) => {

    try {
        const { fromTime, toTime, numberOfRuns } = req.body;
        const query = { name: "botRunIntervals" };
        const update = { name: "botRunIntervals", fromTime, toTime, numberOfRuns };
        const options = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        }
        const response = await botRunIntervalsModel.findOneAndUpdate(query, update, options);
        res.status(200).send(response);
    } catch (err) {
        console.log("error occoured while updating/creating botRunIntervals", err);
        res.status(500).json({ errorMsg: "Server Error" })
    }
});
app.get("/botRunIntervals", async (req, res) => {

    try {

        const response = await botRunIntervalsModel.findOne({ name: "botRunIntervals" });
        res.status(200).send(response);
    } catch (err) {
        console.log("error occoured while updating/creating botRunIntervals", err);
        res.status(500).json({ errorMsg: "Server Error" })
    }
});


app.post("/appointmentsSchedule-create", async (req, res) => {
    try {
        const { randomTimeArray } = req.body;
        randomTimeArray.forEach(async (index) => {
            const doc = new appointmentsScheduleModel({
                date: Date.now(),
                time: index,
                status: "scheduled",
                patient: null,
                appointmentdateTime: null
            });
            await doc.save();
        });
        res.status(201).send("appointments schedule created")
    } catch (error) {
        console.log(error)
        res.status(500).json({ errorMsg: "Server Error" })
    }
});

app.delete("/appointmentsSchedule-delete", async (req, res) => {
    var today = new Date();
    var date1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    try {
        const response = await appointmentsScheduleModel.deleteMany({ date: { $gte: date1 } })
        //   const response =  await appointmentsScheduleModel.find({date: new Date()})
        console.log(response);
        console.log(new Date());
        res.status(202).send("appointments schedule deleted");
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMsg: "Server Error" });
    }
});


app.get("/appointmentsSchedule", async (req, res) => {
    var today = new Date();
    var date1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    try {
        const response = await appointmentsScheduleModel.find({ date: { $gte: date1 } }).sort({ time: 1 })
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMsg: "Server Error" });
    }
});



app.listen(port, () => console.log('Server running at http://localhost:7777 🚀'));

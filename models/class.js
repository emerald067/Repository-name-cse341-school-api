const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gradeLevel: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    teacherName: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    academicYear: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Class", classSchema);
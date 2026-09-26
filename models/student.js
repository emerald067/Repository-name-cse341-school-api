const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    classId: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    enrollmentDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Student", studentSchema);
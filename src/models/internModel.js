const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        lowercase: true,
        required: true
    },
    mobile: {
        type: String,
        trim: true,
        unique: true,
        match: [/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/, 'Please fill a valid mobile number'],
        required: true
    },
    collegeId: {
        type: ObjectId,
        ref: "college",
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


module.exports = mongoose.model("intern", internSchema)
const CollegeModel = require('../models/collegeModel')
const InternModel = require('../models/internModel')

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}
const createCollege = async function (req, res) {

    try {
        let data = req.body

        let { name, fullName, logoLink } = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "BAD REQUEST" })

        }
        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: "name is required" })

        }
        if (!isValid(fullName)) {
            return res.status(400).send({ status: false, msg: "fullName is required" })

        }
        if (!isValid(logoLink)) {
            return res.status(400).send({ status: false, msg: "logoLink is required" })

        }
        let isNameAlreadyUsed = await CollegeModel.findOne({ name })
        if (isNameAlreadyUsed) {
            return res.status(400).send({ status: false, msg: "name already used" })
        }

        let college = await CollegeModel.create(data)

        res.status(201).send({ status: true, data: college })


    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}


const collegeDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName

        if (!collegeName) {
            return res.status(400).send({ status: false, msg: "collegeName is required " })
        }
        let collegeData = await CollegeModel.findOne({ name: collegeName })

        if (!collegeData) {
            return res.status(404).send({ status: false, msg: "collegeData doesn't exist with this collegeName" })
        }
        let collegeId = collegeData._id
        let interns = await InternModel.find({ collegeId: collegeId }).select({ name: 1, email: 1, mobile: 1 })
        let internDetails = {
            name: collegeData.name,
            fullName: collegeData.fullName,
            logoLink: collegeData.logoLink,
            interns: []
        }
        if (Object.keys(interns).length != 0) {
            internDetails.interns = interns
            return res.status(200).send({ status: true, data: internDetails })
        }
        else {
            internDetails.interns = " No Intern Applied To This College"
            res.status(200).send({ status: true, data: internDetails })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}

module.exports.createCollege = createCollege
module.exports.collegeDetails = collegeDetails

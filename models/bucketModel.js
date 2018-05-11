const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let date = new Date()

const bucketSchema = new Schema({
    FirstName: {type: String},
    LastName: {type: String},
    EmailAddress: {type: String},
    PhoneNumber: {type: String},
    Position: {type: String},
    PortfolioUrl: {type: String},
    ResumeUrl: {type: String},
    CoverPageText: {type: String},
    Education: {type: String},
    Experience: {type: String},
    AdditionalText: {type: String},
},{timestamps: true})

const Bucket = mongoose.model("Bucket", bucketSchema)

module.exports = Bucket
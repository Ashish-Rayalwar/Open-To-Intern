const  mongoose  = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    // example: iith,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    // example: `Indian Institute of Technology, Hyderabad`,
  },
  logoLink: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("College", collegeSchema);

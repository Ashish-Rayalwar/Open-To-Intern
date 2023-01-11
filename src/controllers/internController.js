

const httpCodes = require("http-status-codes")
 
const internModel = require("../models/intern");
const collegeModel = require("../models/college");

let validate = /^([a-z A-Z ]){2,30}$/;

let validateMobile = /^[6-9][0-9]{9}$/

let validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const createIntern = async (req, res) => {
  try {
    let data = req.body;

    const { name, email, mobile, collegeName } = data;

    if (Object.keys(data).length === 0) return res.status(400).send({msg:"Please send data in the Body"});
     
    if (!name || !validate.test(name)) return res.status(400).send({ status: false, msg: "Please provide valid Name" });

    if (!email || !validateEmail.test(email)) return res.status(400).send({ status: false, msg: "Please provide valid Email" });
      
    let checkEmail = await internModel.findOne({ email: email });

    if (checkEmail) return res.status(400).send({ status: false, msg: "intern Email already exist" });
      
    if (!mobile || !validateMobile.test(mobile)) return res.status(400).send({ msg: "enter valid contact number" });
      
    let checkMobile = await internModel.findOne({ mobile: mobile });

    if (checkMobile) return res.status(400).send({ status: false, msg: "intern Mobile already exist" });
      
    if (!collegeName) return res.status(400).send({ msg: "plz enter college name" });
      
    let findCollege = await collegeModel.findOne({ name: collegeName });

    if (!findCollege) return res.status(404).send({ msg: "college not found" });

    data.collegeId = findCollege._id.toString();

    let createData = await internModel.create(data)

    return res.status(201).send({ status: true, data: createData });

  } catch (err) {

    console.log("Create intern", err.message);

    return res.status(500).send({ status: false, Error: err.message });
  }
};

module.exports = { createIntern };




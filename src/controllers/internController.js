const express = require("express");

const { isValidObjectId } = require("mongoose");

const internModel = require("../models/intern");
const collegeModel = require("../models/college");

let validate = /^([a-z A-Z ]){2,30}$/;

let validateMobile = /^\d{10}$/;

let validateEmail =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const createIntern = async (req, res) => {
  try {
    let data = req.body;

    const { name, email, mobile, collegeId } = data;

    if (Object.keys(data).length == 0)
      return res.status(400).send("Please send data in the Body");

    if (!name || !validate.test(name)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide valid Name" });
    }

    if (!email || !validateEmail.test(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide valid Email" });
    }

    let checkEmail = await internModel.findOne({ email: email });

    if (checkEmail) {
      return res
        .status(400)
        .send({ status: false, msg: "intern Email already exist" });
    }

    if (!mobile || validateMobile.test(mobile)) {
      return res.send((error) => {
        if (error) {
          return res
            .status(400)
            .send({ status: false, msg: "error in number" });
        }
      });
    }

    let checkMobile = await internModel.findOne({ mobile: mobile });

    if (checkMobile) {
      return res
        .status(400)
        .send({ status: false, msg: "intern Mobile already exist" });
    }

    if (!collegeId || !isValidObjectId(collegeId)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide valid College Id" });
    }

    let college = await collegeModel.findById(collegeId);

    if (!college) {
      return res
        .status(404)
        .send({ status: false, msg: "This college is not exist" });
    }

    let createData = await internModel.create(data);

    return res.status(201).send({ status: true, data: createData });
  } catch (err) {
    console.log("Create intern", err.message);

    return res.status(500).send({ status: false, Error: err.message });
  }
};

module.exports = { createIntern };
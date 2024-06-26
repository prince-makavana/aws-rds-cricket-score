const serverless = require("serverless-http");
const express = require("express");
const app = express();

const userService = require('../services/user.service');
const { fetchUserPhone } = require("../dao/user.dao");
const { userSchema } = require("../middlewares/middleware");
const sequelize = require("../utils/dbConnection");

let otpStore = {};

app.post("/user/registration", async (req, res, next) => {
  let transaction
  try {
    const body = JSON.parse(req.body)
    const { error, value } = userSchema.validate(body);
    if (error) {
      return res.status(409).json({ status: 400, data: error.details })
    }
    const { name, email, dob, phone, otp } = body;
    if (!otpStore[phone] || otpStore[phone].otp !== otp || otpStore[phone].expiry < Date.now()) {
      return res.status(419).json({ success: false, message: 'Invalid OTP or OTP expired' });
    }
    transaction = await sequelize.transaction();
    const existingUser = await fetchUserPhone(phone, email, transaction)
    if (existingUser.length) {
      await transaction.rollback();
      return res.status(409).json({ success: false, message: 'Email or Phone number already exists' });
    }
    const createUser = await userService.createUser(body, transaction);
    await transaction.commit();
    res.status(201).json({ success: true, data: createUser });
  } catch (error) {
    if (transaction) await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
});

app.post("/send-otp", async (req, res) => {
  try {
    const { phone } = JSON.parse(req.body);
    const otp = 1234 // Hardcoded OTP
    otpStore[phone] = { otp, expiry: Date.now() + 60000 };
    res.status(200).json({ success: true, otp });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports.handler = serverless(app);

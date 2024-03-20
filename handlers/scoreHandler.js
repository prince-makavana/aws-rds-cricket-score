const serverless = require("serverless-http");
const express = require("express");
const app = express();

const { scoreSchema } = require("../middlewares/middleware");
const { fetchUsersScore } = require("../dao/score.dao");
const scoreService = require("../services/score.service");
const { decryptData } = require("../utils/encrytionService");

app.post("/score", async (req, res) => {
  try {
    const body = JSON.parse(req.body)
    const { error, value } = scoreSchema.validate(body);
    if (error) {
      return res.status(409).json({ status: 400, data: error.details })
    }
    const { userId } = body;
    const decryptedUserId = await decryptData(userId)
    const scoreCount = await fetchUsersScore(decryptedUserId)
    if (scoreCount.length >= 3) {
      return res.status(409).json({ error: 'You can add score max 3 times a day' })
    }
    const createScore = await scoreService.createScore({...body, userId: decryptedUserId});
    res.status(200).json({ success: true, data: {...createScore.dataValues, userId} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.get('/score/:id/all', async (req, res) => {
  try {
    const { id } = req.params
    const decryptedUserId = await decryptData(id)
    const response = await scoreService.findTotalScoreOfUser(decryptedUserId);
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.get('/score/:id/week', async (req, res) => {
  try {
    const { id } = req.params
    const decryptedUserId = await decryptData(id)
    const response = await scoreService.findTotalScoreOfUserByWeek(decryptedUserId);
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports.scoreHandler = serverless(app);

const scoreDao = require('../dao/score.dao');

const createScore = async (userData) => {
  try {
    return await scoreDao.createScoreService(userData);
  } catch (error) {
    throw error;
  }
};

const findTotalScoreOfUser = async (id) => {
  try {
    const userScore = await scoreDao.findAllUsersTotalScore(id);
    const index = userScore.findIndex(val => val.userId == id)
    const rank = index + 1
    const totalScore = Number(userScore[index].dataValues['totalScore'])
    return {
      rank, totalScore
    }
  } catch (error) {
    throw error;
  }
};

const findTotalScoreOfUserByWeek = async (id) => {
  try {
    let userDetails = await scoreDao.findUserTotalScoreByWeek()
    const weekWiseScore = {};
    userDetails.forEach(userScore => {
      const { week, userId, totalScore } = userScore;
      if (weekWiseScore[week]) {
        weekWiseScore[week].push({ userId, totalScore });
      } else {
        weekWiseScore[week] = [{ userId, totalScore }];
      }
    });
    const responseArr = Object.entries(weekWiseScore).map(([week, userScores]) => {
      userScores.sort((a, b) => b.totalScore - a.totalScore);
      const index = userScores.findIndex(value => parseInt(value.userId) === parseInt(id));
      return {
        week: parseInt(week),
        rank: index !== -1 ? index + 1 : 0,
        totalScore: index !== -1 ? parseInt(userScores[index].totalScore) : 0
      };
    });
    return responseArr
  } catch (error) {

  }
}

module.exports = {
  createScore,
  findTotalScoreOfUser,
  findTotalScoreOfUserByWeek
};
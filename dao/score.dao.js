const { Op } = require('@sequelize/core');

const db = require("../models/db");
const sequelize = require('../utils/dbConnection');

const createScoreService = async (scoreDetails) => {
    try {
        return await db.score.create(scoreDetails)
    } catch (error) {
        throw error
    }
}

const fetchUsersScore = async (userId) => {
    try {
        return await db.score.findAll({
            where: {
                userId,
                createdAt: {
                    [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0))
                }
            }
        })
    } catch (error) {
        throw error
    }
}

const findAllUsersTotalScore = async () => {
    try {
        return await db.score.findAll({
            attributes: ['userId', [sequelize.fn('SUM', sequelize.col('score')), 'totalScore']],
            group: ['userId'],
            order: [[sequelize.literal('totalScore'), 'DESC']]
        })
    } catch (error) {
        throw error
    }
}

const findUserTotalScoreByWeek = async () => {
    try {
        const query = 'select WEEK(DATE_ADD(s.createdAt , INTERVAL 2 DAY)) as week, sum(s.score) as totalScore, s.userId from `cricket-db`.scores s group by week, userId'
        return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    } catch (error) {
        throw error
    }
}

module.exports = {
    createScoreService,
    fetchUsersScore,
    findAllUsersTotalScore,
    findUserTotalScoreByWeek
}
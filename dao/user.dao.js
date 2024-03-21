const { Sequelize } = require("sequelize");
const db = require("../models/db");

const createUserService = async (userDetails, transaction) => {
    try {
        const response = await db.user.create(userDetails, { transaction })
        return response
    } catch (error) {
        throw error
    }
}

const fetchUserPhone = async (phone, email, transaction) => {
    try {
        return await db.user.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { phone },
                    { email }
                ]
            },
            transaction
        })
    } catch (error) {
        throw error
    }
}

module.exports = {
    createUserService,
    fetchUserPhone
}
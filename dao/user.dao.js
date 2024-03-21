const { Sequelize } = require("sequelize");
const db = require("../models/db");

const createUserService = async (userDetails) => {
    try {
        const response = await db.user.create(userDetails)
        return response
    } catch (error) {
        throw error
    }
}

const fetchUserPhone = async (phone, email) => {
    try {
        return await db.user.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { phone },
                    { email }
                ]
            }
        })
    } catch (error) {
        throw error
    }
}

module.exports = {
    createUserService,
    fetchUserPhone
}
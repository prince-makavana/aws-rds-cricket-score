const db = require("../models/db");

const createUserService = async (userDetails) => {
    try {
        const response = await db.user.create(userDetails)
        return response
    } catch (error) {
        throw error
    }
}

const fetchUserPhone = async (phone) => {
    try {
        return await db.user.findAll({ where: { phone } })
    } catch (error) {
        throw error
    }
}

module.exports = {
    createUserService,
    fetchUserPhone
}
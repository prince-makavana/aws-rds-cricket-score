const userDao = require('../dao/user.dao');
const moment = require('moment');
const { encryptData } = require('../utils/encrytionService');

const createUser = async (userData) => {
  try {
    userData.dob = moment(new Date(userData.dob)).format('YYYY-MM-DD')
    delete userData.otp
    const userCreateRes = await userDao.createUserService(userData);
    const encrypUserId = await encryptData(userCreateRes.id)
    return {...userCreateRes.dataValues, id: encrypUserId}
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
};
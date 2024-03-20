const { DataTypes } = require('sequelize');
const sequelize = require('../utils/dbConnection');

const Users = sequelize.define('Users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  dob: {
    type: DataTypes.DATE
  },
  phone: {
    type: DataTypes.INTEGER
  },
}, {
  tableName: 'Users',
  timestamps: false
});

module.exports = Users
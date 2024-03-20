const { DataTypes } = require('sequelize');
const sequelize = require('../utils/dbConnection');

const Scores = sequelize.define('Scores', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  score: {
    type: DataTypes.INTEGER
  },
  userId: {
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
});

module.exports = Scores
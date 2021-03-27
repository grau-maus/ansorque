'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 300]
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [3, 40000]
      }
    },
    userId: DataTypes.INTEGER
  }, {});

  Question.associate = function (models) {
    // associations can be defined here
    Question.belongsTo(models.User, { foreignKey: 'userId' });
    Question.hasMany(models.Answer, { foreignKey: 'questionId' });
  };

  return Question;
};

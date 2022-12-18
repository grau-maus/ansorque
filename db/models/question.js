'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    questionUrl: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 300]
      }
    },
    userId: DataTypes.INTEGER
  }, {});

  Question.associate = function (models) {
    // associations can be defined here
    Question.belongsTo(models.User, { foreignKey: 'userId' });
    Question.hasMany(models.Answer, {
      onDelete: 'cascade',
      foreignKey: 'questionId',
      hooks: true
    });
  };

  return Question;
};

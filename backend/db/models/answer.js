'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [3, 40000]
      }
    },
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {});

  Answer.associate = function (models) {
    // associations can be defined here
    Answer.belongsTo(models.User, { foreignKey: 'userId' });
    Answer.belongsTo(models.Question, { foreignKey: 'questionId' });
  };

  return Answer;
};

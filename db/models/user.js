'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        // CUSTOM VALIDATOR FUNCTION
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  },
    // MODEL SCOPES TO PREVENT CERTAIN INFORMATION BEING SENT TO THE FRONTEND
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] },
        },
        loginUser: {
          attributes: {},
        },
      },
    });

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Question, { foreignKey: 'userId' });
    User.hasMany(models.Answer, { foreignKey: 'userId' });
  };


  // INSTANCE / STATIC METHODS MUST NOT BE AN ARROW FUNCTION BECAUSE OF CONTEXT
  // CUSTOM INSTANCE METHODS:---------------------------------------------------------
  User.prototype.toSafeObject = function () {
    const { id, username, email } = this;

    // RETURNS AN OBJECT WITH 'User' INSTANCE INFORMATION THAT IS SAFE TO SAVE TO A JWT.
    // NOTICE THAT THE 'hashedPassword' AND OTHER KEYS ARE EXCLUDED.
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };
  // CUSTOM INSTANCE METHODS:---------------------------------------------------------


  // CUSTOM STATIC METHODS:-----------------------------------------------------------
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');

    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });

    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword
    });

    return await User.scope('currentUser').findByPk(user.id);
  };
  // CUSTOM STATIC METHODS:-----------------------------------------------------------

  return User;
};

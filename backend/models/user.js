'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull:     false,
      primaryKey:    true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(180),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'L\'email ne peut pas être vide',
        },
        notEmpty: {
          msg: 'L\'email ne peut pas être vide',
        },
        isEmail: {
          msg: 'Le format de l\'email n\'est pas correct',
        },
        async isUnique(email) {
          const user = await User.findOne({ where: { email: email } })
          if (user) {
            throw new Error('Cette adresse email existe déjà');
          }
        }
      }
    },
    username: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Le nom d\'utilisateur ne peut pas être vide',
        },
        isValidLength(username) {
          if (username.length < 3) {
            throw new Error('Le nom d\'utilisateur doit contenir au minimum 3 caractères');
          } else if (username.length > 60) {
            throw new Error('Le nom d\'utilisateur doit contenir au maximum 60 caractères')
          }
        },
        async isUnique(username) {
          const user = await User.findOne({ where: { username: username } })
            if (user) {
              throw new Error('Ce nom d\'utilisateur existe déjà');
            }
        }
      }
    },
    roles: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: ['ROLE_USER'],
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

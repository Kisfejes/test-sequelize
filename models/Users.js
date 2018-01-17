module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    fullName: DataTypes.STRING,
    fullNameUnaccent: DataTypes.STRING
  });

  return Users;
};

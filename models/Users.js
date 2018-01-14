module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    fullName: DataTypes.STRING
  });

  return Users;
};

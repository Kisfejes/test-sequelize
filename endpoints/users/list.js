const { getDB } = require('../../db/db');
const sequelize = require('sequelize');

module.exports = async (req, res) => {
  try {
    const db = getDB();

    const queryObj = {
      attributes: ['fullName'],
    };

    if (req.query.name) {
      queryObj.where = sequelize.where(
        sequelize.fn('unaccent', sequelize.col('fullName')),
        { ilike: `%${req.query.name}%` }
      );
    }

    const users = await db.Users.findAll(queryObj);

    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const { getDB } = require('../../db/db');

module.exports = async (req, res) => {
  try {
    const db = getDB();

    const users = await db.Users.findAll();

    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

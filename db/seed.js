const fs = require('fs');
const config = require('../config/config.js');

/**
 * Seed the database with given objects of a model
 * @param  {object} db
 * @param  {string} modelName
 * @param  {array} data
 * @param  {string} condition
 */
async function seedDBwithObjects(db, modelName, data, condition) {
  for (const modelInstance of data) {
    const obj = modelInstance.data;
    const includes = modelInstance.include;
    let includeModels = [];
    if (includes !== undefined) {
      includeModels = includes.map(include => db[include]);
    }
    if (condition !== undefined && condition !== null) {
      await db[modelName].findOrCreate({ where: { condition: obj[condition] } }, { defaults: obj }, { include: includeModels });
    } else {
      await db[modelName].create(obj, { include: includeModels });
    }
  }
}

/**
 * Seed the database with the given JSON file
 * @param  {object} db
 * @param  {string} jsonFilePath
 */
async function seedDBwithJSON(db, jsonFilePath) {
  console.log(`Seed database with JSON file: ${jsonFilePath}`);
  const seedFile = fs.readFileSync(jsonFilePath);
  const seed = JSON.parse(seedFile.toString());
  for (const modelName of Object.keys(seed)) {
    if (!(modelName in db)) {
      throw new Error(`DB has no model with name: "${modelName}"`);
    }
    const model = seed[modelName];
    await seedDBwithObjects(db, modelName, model);
  }
}

module.exports = {
  seedDBwithJSON,
  seedDBwithObjects
};

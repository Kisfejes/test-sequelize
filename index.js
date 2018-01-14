const { initDB, closeDB } = require('./db/db');

async function main() {
  try {
    const db = await initDB();
  } catch (err) {
    console.log(err);
  } finally {
    await closeDB();
  }
}

main();

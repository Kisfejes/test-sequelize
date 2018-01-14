#!/usr/bin/env node
const yargs = require('yargs');

yargs // eslint-disable-line
  .usage('cli <command>')
  .command({
    command: 'reset-database',
    aliases: ['rd'],
    desc: 'Reset database with current models',
    handler: async () => {
      const { initDB, closeDB } = require('./db/db');
      try {
        console.log('Reset database');
        const db = await initDB({ force: true });
      } catch (err) {
        console.log(err);
      } finally {
        await closeDB();
      }
    }
  })
  .command({
    command: 'seed-database',
    aliases: ['sd'],
    desc: 'Seed database',
    builder: () => yargs
      .option('seed-file', {
        alias: 'sf',
        default: 'seed-file1.json'
      }),
    handler: async (argv) => {
      const { initDB, closeDB } = require('./db/db');
      const { seedDBwithJSON } = require('./db/seed');
      const path = require('path');

      try {
        console.log('Seed database');
        const db = await initDB({ force: true });
        await seedDBwithJSON(db, path.join(__dirname, 'data', argv.seedFile))
      } catch (err) {
        console.log(err);
      } finally {
        await closeDB();
      }
    }
  })
  .epilog('sequelize-test')
  .help()
  .argv;

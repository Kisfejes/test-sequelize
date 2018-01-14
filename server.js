const http = require('http');
const express = require('express');

const { initDB, closeDB } = require('./db/db');

async function initServer() {
  try {
    await initDB();

    const port = 7878;
    const app = express();

    const endpointRoutes = require('./endpoints');
    app.use(endpointRoutes);

    app.use('/', (req, res) => {
      res.status(404).send('Endpoint not found');
    });

    http.createServer(app);

    app.listen(port, () => {
      console.log(`Server listening on localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
    await closeDB();
  }
}

initServer();


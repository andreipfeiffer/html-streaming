import express from 'express';
import spdy from 'spdy';
import { readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { WritableStream } from 'node:stream/web';

import * as controller from "./controller.js";
import {getHead, getMenu, getFooter, getHeavyBody, __dirname} from "./utils.js"

const PORT = 3303
const CERT_DIR = `${__dirname}/cert`;
const useSSL = false;
const app = express();

app.use(express.static('public'));

app.get('/', controller.homePageController);
app.get('/page', controller.regularPageController);
app.get('/page-async', controller.asyncPageController);
app.get('/stream-http', controller.httpStreamController);
app.get('/stream-dsd', controller.dsdStreamController);

app.get('/body', async (req, res) => {
  const body = await getHeavyBody();
  res.send(body)
})

function createServer() {
  if (!useSSL) {
    return app;
  }

  return spdy.createServer(
    {
      key: readFileSync(`${CERT_DIR}/server.key`),
      cert: readFileSync(`${CERT_DIR}/server.cert`),
    },
    app
  );
}

const server = createServer();

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}: ${useSSL ? "https" : "http"}://localhost:${PORT}`);
  console.log(`SSL ${useSSL ? 'enabled' : 'disabled'}`);
});

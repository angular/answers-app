/// <reference path="../typings/tsd.d.ts" />

import * as path from 'path';
import * as express from 'express';
import {SERVER_LOCATION_PROVIDERS, ng2engine} from 'angular2-universal-preview/dist/server';

import {provide} from 'angular2/core';
import {APP_BASE_HREF, ROUTER_PROVIDERS} from 'angular2/router';

import {SHARED_PROVIDERS} from './shared-providers';

// Angular 2
import {App} from './app/app';

const PORT = process.env.PORT || 3000;

let app = express();
let root = path.join(path.resolve(__dirname, '..'));

// Express View
app.engine('.ng2.html', ng2engine);
app.set('views', root);
app.set('view engine', 'ng2.html');

// Serve static files
app.use(express.static(root));

// Routes
app.use('/', (req, res) => {
  res.render('index', { App, providers: [
    ROUTER_PROVIDERS,
    SERVER_LOCATION_PROVIDERS,
    provide(APP_BASE_HREF, {useValue: `http://localhost:${PORT}${req.baseUrl}`}),
    SHARED_PROVIDERS
  ] });
});

// Server
app.listen(PORT, () => {
  console.log(`Listen on http://localhost:${PORT}`);
});

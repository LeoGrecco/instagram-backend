require('ts-node/register/transpile-only');

const express = require('express');
const { setRoutes } = require('../src/routes/instagram.routes');

describe('Express route setup', () => {
  test('should mount /posts on the provided app', () => {
    const app = express();

    setRoutes(app);

    const routeExists = app._router.stack.some(
      (layer) => layer.route && layer.route.path === '/posts'
    );

    expect(routeExists).toBe(true);
  });
});

require('ts-node/register/transpile-only');
const assert = require('assert');

const { createApp } = require('../src/app');
const { accountStore } = require('../src/stores/account.store');

const httpRequest = (app, method, path, body, token) => new Promise((resolve, reject) => {
  const server = app.listen(0, () => {
    const port = server.address().port;
    const req = require('http').request({ port, method, path, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) } }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { server.close(); resolve({ status: res.statusCode, body: data ? JSON.parse(data) : {} }); });
    });
    req.on('error', (error) => { server.close(); reject(error); });
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
});

const run = async () => {
  accountStore.clear();
  {
    const app = createApp();
    const registration = await httpRequest(app, 'POST', '/api/auth/register', {
      name: 'Conta interna',
      email: 'internal@example.com',
      password: 'password123',
    });

    assert.strictEqual(registration.status, 201);
    assert.ok(registration.body.token);

    const profile = await httpRequest(app, 'GET', '/api/account', undefined, registration.body.token);
    assert.strictEqual(profile.status, 200);
    assert.strictEqual(profile.body.email, 'internal@example.com');
  }

  {
    const app = createApp();
    const first = await httpRequest(app, 'POST', '/api/auth/register', { name: 'First', email: 'first@example.com', password: 'password123' });
    const second = await httpRequest(app, 'POST', '/api/auth/register', { name: 'Second', email: 'second@example.com', password: 'password123' });

    await httpRequest(app, 'PUT', '/api/account/instagram', { accessToken: 'first-token' }, first.body.token);

    const firstProfile = await httpRequest(app, 'GET', '/api/account', undefined, first.body.token);
    const secondProfile = await httpRequest(app, 'GET', '/api/account', undefined, second.body.token);
    assert.strictEqual(firstProfile.body.instagramConnected, true);
    assert.strictEqual(secondProfile.body.instagramConnected, false);
  }
  console.log('SaaS account flow: OK');
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

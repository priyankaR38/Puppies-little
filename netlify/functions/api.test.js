import assert from 'node:assert/strict';
import test from 'node:test';
import { handler } from './api.js';

test('Netlify API function serves the demo puppy catalogue', async () => {
  const response = await handler({
    httpMethod: 'GET',
    path: '/.netlify/functions/api/puppies',
    queryStringParameters: null,
  });

  assert.equal(response.statusCode, 200);
  const payload = JSON.parse(response.body);
  assert.equal(payload.mode, 'demo');
  assert.ok(payload.data.some((puppy) => puppy.slug === 'shitzu-male'));
});

test('Netlify API function validates catalogue filters', async () => {
  const response = await handler({
    httpMethod: 'GET',
    path: '/.netlify/functions/api/puppies',
    queryStringParameters: { status: 'invalid' },
  });

  assert.equal(response.statusCode, 400);
});

test('Netlify API function serves puppy detail data', async () => {
  const response = await handler({
    httpMethod: 'GET',
    path: '/.netlify/functions/api/puppies/shitzu-male',
    queryStringParameters: null,
  });

  assert.equal(response.statusCode, 200);
  assert.equal(JSON.parse(response.body).data.slug, 'shitzu-male');
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { listPuppies } from './db.js';

test('demo puppy catalogue contains seeded entries', async () => {
  const puppies = await listPuppies({});
  assert.equal(puppies.length, 19);
  assert.equal(puppies[0].name, 'Olive');
});

test('Shih Tzu boy route resolves to the profile with its photo gallery', async () => {
  const puppy = (await listPuppies({})).find((item) => item.slug === 'shitzu-male');
  assert.ok(puppy);
  assert.equal(puppy.breed, 'Shih Tzu');
  assert.equal(puppy.gender, 'Boy');
  assert.equal(puppy.photo_urls.length, 2);
});

test('imported Korean collection filters preserve breed matching', async () => {
  const puppies = await listPuppies({ origin: 'imported', collection: 'korean-teacup', breed: 'maltipoo' });
  assert.equal(puppies.length, 1);
  assert.equal(puppies[0].slug, 'korean-maltipoo');
});

test('gone-home catalogue returns only archived demo entries', async () => {
  const puppies = await listPuppies({ status: 'gone-home' });
  assert.equal(puppies.length, 4);
  assert.ok(puppies.every((puppy) => puppy.available === false));
});

test('puppy catalogue filters by breed, gender, location, and search', async () => {
  const puppies = await listPuppies({
    breed: 'Cavapoo',
    gender: 'Boy',
    location: 'Dubai',
    search: 'biscuit',
  });
  assert.equal(puppies.length, 1);
  assert.equal(puppies[0].slug, 'biscuit-cavapoo');
});

test('filters with no matching puppies return an empty list', async () => {
  const puppies = await listPuppies({ search: 'not-a-puppy' });
  assert.deepEqual(puppies, []);
});

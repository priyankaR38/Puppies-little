import mysql from 'mysql2/promise';
import { demoGoneHomePuppies, demoPuppies } from './data.js';

const hasDatabaseConfig = Boolean(process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME);
let pool;

if (hasDatabaseConfig) {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

export const isDemoMode = !pool;

function withPhotoUrls(puppy) {
  const photoUrls = typeof puppy.photo_urls === 'string' ? JSON.parse(puppy.photo_urls) : puppy.photo_urls;
  return {
    ...puppy,
    photo_urls: Array.isArray(photoUrls) && photoUrls.every((url) => typeof url === 'string') && photoUrls.length
      ? photoUrls
      : [puppy.image_url],
  };
}

export async function listPuppies({ breed, gender, location, search, origin, collection, status }) {
  const isGoneHome = status === 'gone-home';
  if (!pool) {
    const catalogue = isGoneHome ? demoGoneHomePuppies : demoPuppies;
    return catalogue.filter((puppy) => {
      const matchesBreed = !breed || puppy.breed.toLowerCase().includes(breed.toLowerCase());
      const matchesGender = !gender || puppy.gender.toLowerCase() === gender.toLowerCase();
      const matchesLocation = !location || puppy.location.toLowerCase() === location.toLowerCase();
      const matchesOrigin = !origin || (origin === 'imported' ? puppy.location === 'Coming soon' : puppy.location === 'Dubai');
      const matchesCollection = !collection || puppy.collection === collection;
      const matchesSearch = !search || `${puppy.name} ${puppy.breed}`.toLowerCase().includes(search.toLowerCase());
      return matchesBreed && matchesGender && matchesLocation && matchesOrigin && matchesCollection && matchesSearch;
    });
  }

  const conditions = [isGoneHome ? 'available = FALSE' : 'available = TRUE'];
  const values = [];
  if (breed) {
    conditions.push('LOWER(breed) LIKE LOWER(?)');
    values.push(`%${breed}%`);
  }
  if (gender) {
    conditions.push('LOWER(gender) = LOWER(?)');
    values.push(gender);
  }
  if (location) {
    conditions.push('LOWER(location) = LOWER(?)');
    values.push(location);
  }
  if (origin) {
    conditions.push('origin = ?');
    values.push(origin);
  }
  if (collection) {
    conditions.push('collection = ?');
    values.push(collection);
  }
  if (search) {
    conditions.push('(LOWER(name) LIKE LOWER(?) OR LOWER(breed) LIKE LOWER(?))');
    values.push(`%${search}%`, `%${search}%`);
  }
  const [rows] = await pool.execute(
    `SELECT id, slug, name, breed, gender, age_months, location, image_url, photo_urls, description, available FROM puppies WHERE ${conditions.join(' AND ')} ORDER BY id`,
    values,
  );
  return rows.map(withPhotoUrls);
}

export async function getPuppyBySlug(slug) {
  if (!pool) return [...demoPuppies, ...demoGoneHomePuppies].find((puppy) => puppy.slug === slug) || null;
  const [rows] = await pool.execute(
    'SELECT id, slug, name, breed, gender, age_months, location, image_url, photo_urls, description, available FROM puppies WHERE slug = ? LIMIT 1',
    [slug],
  );
  const puppy = rows[0];
  return puppy ? withPhotoUrls(puppy) : null;
}

export async function createInquiry({ puppyId, name, email, phone, area, message }) {
  if (!pool) return { id: Date.now(), puppy_id: puppyId || null, name, email, phone, area, message };
  const [result] = await pool.execute(
    'INSERT INTO inquiries (puppy_id, name, email, phone, area, message) VALUES (?, ?, ?, ?, ?, ?)',
    [puppyId || null, name, email || null, phone, area || null, message],
  );
  return { id: result.insertId, puppy_id: puppyId || null, name, email, phone, area, message };
}

export async function checkDatabase() {
  if (!pool) return { mode: 'demo' };
  await pool.query('SELECT 1');
  return { mode: 'mysql' };
}

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { checkDatabase, createInquiry, getPuppyBySlug, isDemoMode, listPuppies } from './db.js';

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') || true }));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', async (_req, res) => {
  try {
    const database = await checkDatabase();
    res.json({ status: 'ok', database: database.mode });
  } catch (error) {
    console.error('Database health check failed:', error.message);
    res.status(503).json({ status: 'error', message: 'Database is unavailable.' });
  }
});

app.get('/api/puppies', async (req, res, next) => {
  try {
    const { breed, gender, location, search, origin, collection, status } = req.query;
    if (status && status !== 'available' && status !== 'gone-home') {
      return res.status(400).json({ message: 'Status must be available or gone-home.' });
    }
    if (origin && origin !== 'local' && origin !== 'imported') {
      return res.status(400).json({ message: 'Origin must be local or imported.' });
    }
    if (collection && collection !== 'korean-teacup') {
      return res.status(400).json({ message: 'Collection is not supported.' });
    }
    if (gender && gender !== 'boy' && gender !== 'girl') {
      return res.status(400).json({ message: 'Gender must be boy or girl.' });
    }
    const puppies = await listPuppies({
      breed: typeof breed === 'string' ? breed : undefined,
      gender: typeof gender === 'string' ? gender : undefined,
      location: typeof location === 'string' ? location : undefined,
      search: typeof search === 'string' ? search.trim().slice(0, 80) : undefined,
      origin: origin === 'local' || origin === 'imported' ? origin : undefined,
      collection: collection === 'korean-teacup' ? collection : undefined,
      status,
    });
    res.json({ data: puppies, mode: isDemoMode ? 'demo' : 'mysql' });
  } catch (error) {
    next(error);
  }
});

app.get('/api/puppies/:slug', async (req, res, next) => {
  try {
    const puppy = await getPuppyBySlug(req.params.slug);
    if (!puppy) return res.status(404).json({ message: 'Puppy not found.' });
    res.json({ data: puppy });
  } catch (error) {
    next(error);
  }
});

app.post('/api/inquiries', async (req, res, next) => {
  const { puppyId = null, name, email = '', phone, area = '', message } = req.body || {};
  if (
    (puppyId !== null && !Number.isInteger(Number(puppyId))) ||
    typeof name !== 'string' || name.trim().length < 2 || name.length > 120 ||
    typeof email !== 'string' || (email.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || email.length > 190 ||
    typeof phone !== 'string' || phone.trim().length < 5 || phone.length > 40 ||
    typeof area !== 'string' || area.length > 120 ||
    typeof message !== 'string' || message.trim().length < 5 || message.length > 2000
  ) {
    return res.status(400).json({ message: 'Please provide a valid name and phone number, plus a valid email address if supplied.' });
  }
  try {
    const inquiry = await createInquiry({
      puppyId: puppyId === null ? null : Number(puppyId),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      area: area.trim(),
      message: message.trim(),
    });
    res.status(201).json({ message: 'Thanks! Your message has been received.', data: { id: inquiry.id } });
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error('API request failed:', error.message);
  res.status(500).json({ message: 'The request could not be completed. Please try again.' });
});

app.listen(port, () => {
  console.log(`Little Paws API listening on http://localhost:${port} (${isDemoMode ? 'demo data' : 'MySQL'})`);
});

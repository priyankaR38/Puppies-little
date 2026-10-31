import {
  checkDatabase,
  createInquiry,
  getPuppyBySlug,
  isDemoMode,
  listPuppies,
} from '../../server/db.js';

const functionPrefix = '/.netlify/functions/api';
const maxBodyLength = 20 * 1024;

function jsonResponse(statusCode, body, origin = '*') {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  };
}

function getApiPath(path = '/') {
  let apiPath = path;
  if (apiPath.startsWith(functionPrefix)) {
    apiPath = apiPath.slice(functionPrefix.length) || '/';
  }
  if (apiPath === '/api') return '/';
  if (apiPath.startsWith('/api/')) return apiPath.slice(4);
  return apiPath;
}

export async function handler(event) {
  const allowedOrigin = process.env.CLIENT_ORIGIN || '*';
  const method = event.httpMethod || 'GET';

  if (method === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: '',
    };
  }

  const path = getApiPath(event.path || '/');
  const query = event.queryStringParameters || {};

  try {
    if (method === 'GET' && path === '/health') {
      try {
        const database = await checkDatabase();
        return jsonResponse(200, { status: 'ok', database: database.mode }, allowedOrigin);
      } catch (error) {
        console.error('Database health check failed:', error.message);
        return jsonResponse(503, { status: 'error', message: 'Database is unavailable.' }, allowedOrigin);
      }
    }

    if (method === 'GET' && path === '/puppies') {
      const { breed, gender, location, search, origin, collection, status } = query;
      if (status && status !== 'available' && status !== 'gone-home') {
        return jsonResponse(400, { message: 'Status must be available or gone-home.' }, allowedOrigin);
      }
      if (origin && origin !== 'local' && origin !== 'imported') {
        return jsonResponse(400, { message: 'Origin must be local or imported.' }, allowedOrigin);
      }
      if (collection && collection !== 'korean-teacup') {
        return jsonResponse(400, { message: 'Collection is not supported.' }, allowedOrigin);
      }
      if (gender && gender !== 'boy' && gender !== 'girl') {
        return jsonResponse(400, { message: 'Gender must be boy or girl.' }, allowedOrigin);
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
      return jsonResponse(200, { data: puppies, mode: isDemoMode ? 'demo' : 'mysql' }, allowedOrigin);
    }

    if (method === 'GET' && path.startsWith('/puppies/')) {
      const slug = decodeURIComponent(path.slice('/puppies/'.length));
      const puppy = await getPuppyBySlug(slug);
      if (!puppy) return jsonResponse(404, { message: 'Puppy not found.' }, allowedOrigin);
      return jsonResponse(200, { data: puppy }, allowedOrigin);
    }

    if (method === 'POST' && path === '/inquiries') {
      if (!event.body || event.body.length > maxBodyLength) {
        return jsonResponse(400, { message: 'The request body is missing or too large.' }, allowedOrigin);
      }

      let body;
      try {
        body = JSON.parse(event.isBase64Encoded
          ? Buffer.from(event.body, 'base64').toString('utf8')
          : event.body);
      } catch {
        return jsonResponse(400, { message: 'The request body must be valid JSON.' }, allowedOrigin);
      }

      const { puppyId = null, name, email = '', phone, area = '', message } = body || {};
      if (
        (puppyId !== null && !Number.isInteger(Number(puppyId))) ||
        typeof name !== 'string' || name.trim().length < 2 || name.length > 120 ||
        typeof email !== 'string' || (email.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || email.length > 190 ||
        typeof phone !== 'string' || phone.trim().length < 5 || phone.length > 40 ||
        typeof area !== 'string' || area.length > 120 ||
        typeof message !== 'string' || message.trim().length < 5 || message.length > 2000
      ) {
        return jsonResponse(400, {
          message: 'Please provide a valid name and phone number, plus a valid email address if supplied.',
        }, allowedOrigin);
      }

      const inquiry = await createInquiry({
        puppyId: puppyId === null ? null : Number(puppyId),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        area: area.trim(),
        message: message.trim(),
      });
      return jsonResponse(201, {
        message: 'Thanks! Your message has been received.',
        data: { id: inquiry.id },
      }, allowedOrigin);
    }

    return jsonResponse(404, { message: 'API route not found.' }, allowedOrigin);
  } catch (error) {
    console.error('API request failed:', error.message);
    return jsonResponse(500, { message: 'The request could not be completed. Please try again.' }, allowedOrigin);
  }
}

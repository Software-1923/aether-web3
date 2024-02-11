const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const helmet = require('helmet'); // Helmet kütüphanesini ekliyoruz

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    // Helmet middleware'ini kullanarak güvenlik önlemlerini aktif hale getiriyoruz
    helmet()(req, res, () => {
      handle(req, res, parsedUrl);
    });
  }).listen(3001, (err) => {
    if (err) throw err;
    console.log('Next.js server is running on port 3001.');
  });
});

/**
 * @file src/index.js
 */

const path = require('path');
const express = require('express');
const cors = require('cors');

// Initialize Application
const app = express();

// Serve static files here.
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware
app.use(cors())

// GET /
//
// Serves the home page.
app.get('/', (_, res) => res.status(200).sendFile(path.join(__dirname, 'pages', 'index.html')))

// GET /api/whoami
//
// Parses the following headers...
//   - 'x-forwarded-for' to retrieve your system's IP address.
//     - If this header is not present, get the address from the socket's remote address.
//   - 'accept-language' to retrieve your browser's preferred language.
//   - 'User-Agent' to retrieve your browser software's user agent string.
app.get('/api/whoami', (req, res) => {
  return res.status(200).json({ 
    ipaddress: req.get('x-forwarded-for') || req.socket.remoteAddress,
    language: req.get('accept-language'),
    software: req.get('User-Agent') 
  });
});

// Listen for Connections
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port #${port}. . .`);
})
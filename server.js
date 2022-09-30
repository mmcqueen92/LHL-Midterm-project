// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);

// CookieSession for encrypted cookies
app.use(cookieSession({
  name: 'session',
  keys: ["superSecretCookieSession"],

  // Cookie Options
  maxAge: 10 * 60 * 1000 // 10 mins
}));


app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards-api.js');
const commentsRoutes = require('./routes/comments-api.js');
const collectionsRoutes = require('./routes/collections-api.js');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
// Note: mount other resources here, using the same pattern above
app.use('/api/cards', cardsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/collections', collectionsRoutes);
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).



// Logging In - via url hack or login button, no actual auth tho
app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  // console.log("the session id is: ", req.session.user_id);
  res.redirect('/');
});

// Logging out - via url hack or logout button
app.post('/logout', (req, res) => {
  // nullifies session cookies
  req.session = null;
  // console.log(`if we see this, session should = null`)
  res.render('index');
});

app.get('/', (req, res) => {
  res.render('index');
});
// app.post('/register/:id', (req, res) => {
//   req.session.user_id = req.params.id;
//   res.post('/* send them to a route that inserts them into usersDB */')
// })

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

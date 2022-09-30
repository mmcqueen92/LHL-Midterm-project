/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const getAllCards = require('../db/queries/getAllCards');
const registerUser = require('../db/queries/registerUser');

//GET REQUESTS

//GET getUsers

router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/register/:email', (req, res) => {
  registerUser.registerUser(req.params.email)
    .then((data) => {
      res.redirect('/');
    })
    .catch(err => {
      res
        .json({error: err.message});
    })
})



// GET renderCard

// router.get('/', (req, res) => {
//   userQueries.renderCard()
//     .then(users => {
//       res.json({ users });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });



//POST REQUESTS - CREATE

// router.post("/register", (req, res) => {

// });

// router.post("/login", (req, res) => {

// });

// app.get("/register", (req, res) => {
//   if (users[req.session.user_id]) {
//     return res.redirect("/urls");
//   }
//   return res.render("registration", {user: null});
// });

// app.get("/login", (req, res) => {
//   if (users[req.session.user_id]) {
//     return res.redirect("/urls");
//   }
//   return res.render("login", {user: null});
// });

// app.post("/login", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   let currentUser = getUserByEmail(email, users);
//   if (!currentUser) {
//     return res.status(403).send('User cannot be found');
//   }
//   if (!bcrypt.compareSync(password, currentUser.password)) {
//     return res.status(403).send('Password is not correct');
//   }
//   //Set cookie named user_id
//   //res.cookie(name, value)
//   req.session.user_id = currentUser.id;
//   return res.redirect(`/urls`);
// });

module.exports = router;

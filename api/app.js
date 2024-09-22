const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const UserManager = require('./application/modules/UserManager/UserManager');
const VoteManager = require('./application/modules/VoteManager/VoteManager');

const authHandler = require("./application/router/handlers/authHandler")

const DB = require('./application/modules/DB/DB');


const Router = require('./application/router/Router');

const db = new DB;
const userManager = new UserManager(db, authHandler);
const voteManager = new VoteManager(db, authHandler);

const router = new Router(userManager, voteManager);

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(express.static(`${__dirname}/public`));
app.use('/', router);
app.use(express.json());    
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => console.log('Backend Live Matters!!!')); 
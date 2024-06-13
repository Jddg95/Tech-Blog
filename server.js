const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./config/connections'); // import the database connection 
const routes = require('./controllers'); // import routes 
const helpers = require('./utils/helpers') // import any helper functions 



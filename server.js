const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./config/connections'); // import the database connection 
const routes = require('./controllers'); // import routes 
const helpers = require('./utils/helpers') // import any helper functions 

const app = express();
const PORT = process.env.PORT || 3001; // User env port 

const hbs = exphbs.create({ helpers }); // Set up handlebars with helpers 

//configute session with sequilize store 
const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
        resave: false,
        saveUninitialized: true,
        store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess)); // use session middleware 

app.engine('handlebars', hbs.engine); // Set handlebars as the view engine 
app.set('view engine', handlebars);

app.use(express.json());
app.use(express.urlencoded({ extend: true })); // Parse URL-encoded bodies 
app.use(express.static(path.join(__dirname, 'public'))); // Server static files 

app.use(routes); // use routes from the controller 

//Sync the datavase and start the server 
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'));
});
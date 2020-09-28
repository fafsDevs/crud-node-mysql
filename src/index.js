require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const exphbs = require('express-handlebars');
const path =require('path');
const session = require('express-session');
const MysqlSession = require('express-mysql-session');
const flash = require('connect-flash');
const passport = require('passport');

const { database } = require('./keys');

const app = express();
require('./lib/passport');

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: 'mysecrettext',
    resave: 'false',
    saveUninitialized: 'false',
    store: new MysqlSession(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Globals variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
})

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/auth'));
app.use('/contacts', require('./routes/contacts'));


//Static files
app.use(express.static(path.join(__dirname, 'public')))

//Server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
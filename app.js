//------IMPORT EXTERNE---------------------------------------------------------------------------------------
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
//-----IMPORT LOCAL------------------------------------------------------------------------------------------
const index = require('./routes/index');
const users = require('./routes/users');
const db = require('./database/database');
//------VARIABLE GLOBALE-------------------------------------------------------------------------------------
let app = express();

//----VIEW ENGINE--------------------------------------------------------------------------------------------
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

//-----MIDDLE WARE-------------------------------------------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Express session
let options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'matcha'
};
let sessionStore = new MySQLStore(options);
app.use(session({
    secret: 'secret',
    saveUninitialized :  false,
    resave: false,
    store: sessionStore
    // cookie: {secure: true}
}));

//Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        let namespace = param.split('.')
            ,root = namespace.shift()
            , formParam = root;
        while(namespace.lenght){
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param : formParam,
            msg: msg,
        };
}
}));

//connect flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
//-----ROUTE-------------------------------------------------------------------------------------------------
app.use('/', index);
app.use('/users' ,users);

//----SERVER-------------------------------------------------------------------------------------------------
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function () {
    console.log('Server started om port' +app.get('port'));
});
var morgan = require('morgan');
var bodyParser = require('body-parser');
var engine = require('ejs-locals');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

module.exports = function (app, express) {

  var authRouter = express.Router();
  var commonRouter = express.Router();
  var userRouter = express.Router();
  var locationRouter = express.Router();
  var proximityRouter = express.Router();
  var caseRouter = express.Router();

  require('./passport')(passport); // pass passport for configuration

  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(allowCrossDomain);

  app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.set('views', __dirname + '/../views');
  app.engine('ejs', engine);
  app.set('view engine', 'ejs');

  app.use(express.static(__dirname + './../pubic'));
  app.use("/mobile", express.static(__dirname + "./../../mobile/www"));

  app.use('/api/users', userRouter);
  app.use('/api/locations', locationRouter);
  app.use('/api/cases', caseRouter);
  app.use('/api/proximity', proximityRouter);
  app.use('/auth', authRouter);
  app.use('/', commonRouter);

  require('../routes/authRoutes.js')(authRouter);
  require('../routes/caseRoutes.js')(caseRouter);
  require('../routes/commonRoutes.js')(commonRouter);
  require('../routes/userRoutes.js')(userRouter);
  require('../routes/locationRoutes.js')(locationRouter);
  require('../routes/proximityRoutes.js')(proximityRouter);
};

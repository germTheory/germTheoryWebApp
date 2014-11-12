var morgan = require('morgan'); // used for logging incoming request
var bodyParser = require('body-parser');
var engine = require('ejs-locals');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var helpers = require('./../lib/helpers');

module.exports = function (app, express) {

  var authRouter = express.Router();
  var commonRouter = express.Router();
  var userRouter = express.Router();
  var locationRouter = express.Router();
  var proximityRouter = express.Router();

  require('./passport')(passport); // pass passport for configuration

  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash());

  app.set('views', __dirname + '/../views');
  app.engine('ejs', engine);
  app.set('view engine', 'ejs');

  app.use(express.static(__dirname + './../pubic'));
  app.use("/mobile", express.static(__dirname + "./../../mobile/www"));

  app.use('/api/users', userRouter); // use user router for all user request
  app.use('/api/locations', locationRouter); // location router for all generalizedlocation data
  app.use('/api/proximity', proximityRouter);
  app.use('/auth', authRouter);
  app.use('/', commonRouter);


  // authentication middleware used to decode token and made available on the request
  // app.use('/api/locations', helpers.decode);
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  require('../routes/authRoutes.js')(authRouter);
  require('../routes/commonRoutes.js')(commonRouter);
  require('../routes/userRoutes.js')(userRouter);
  require('../routes/locationRoutes.js')(locationRouter);
  require('../routes/proximityRoutes.js')(proximityRouter);
};

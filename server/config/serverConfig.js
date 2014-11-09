var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    helpers     = require('./helpers.js');

module.exports = function (app, express) {

  var commonRouter = express.Router();
  var userRouter = express.Router();
  var locationRouter = express.Router();
  var proximityRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.set('views', __dirname + '/../views');
  app.set('view engine', 'ejs');

  //app.use(express.static(__dirname + './../../client'));
  app.use("/mobile", express.static(__dirname + "./../../mobile/www"));

  app.use('/api/users', userRouter); // use user router for all user request
  app.use('/api/locations', locationRouter); // location router for all generalizedlocation data
  app.use('/api/proximity', proximityRouter);
  app.use('/', commonRouter);

  // authentication middleware used to decode token and made available on the request
  // app.use('/api/locations', helpers.decode);
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  require('../routes/commonRoutes.js')(commonRouter);
  require('../routes/userRoutes.js')(userRouter);
  require('../routes/locationRoutes.js')(locationRouter);
  require('../routes/proximityRoutes.js')(proximityRouter);
};

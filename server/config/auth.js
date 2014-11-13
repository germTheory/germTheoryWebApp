module.exports = {
  'googleAuth' : {
    'clientID'      : process.env.GOOG_CLIENT_ID || process.env.GOOG_CLIENT_ID_DEV,
    'clientSecret'  : process.env.GOOG_CLIENT_SECRET || process.env.GOOG_CLIENT_SECRET_DEV,
    'callbackURL'   : process.env.GOOG_CLIENT_CALLBACK_URL || process.env.GOOG_CLIENT_CALLBACK_URL
  }
};

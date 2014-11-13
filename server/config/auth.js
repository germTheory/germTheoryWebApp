module.exports = {
  'googleAuth' : {
    'clientID'      : process.env.GOOG_CLIENT_ID || '454868183265-ghh762us4dfa38s74ghd1ada74tmdf0q.apps.googleusercontent.com',
    'clientSecret'  : process.env.GOOG_CLIENT_SECRET || 's7akA-bkPcXmKrl1gllJ4-Js',
    'callbackURL'   : process.env.GOOG_CLIENT_CALLBACK_URL || 'http://localhost:4568/auth/google/callback'
  }
};

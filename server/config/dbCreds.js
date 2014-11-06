module.exports= {
  client: 'pg',
  connection: {
    host     : process.env.DB_HOST || 'localhost',
    user     : process.env.DB_USER || 'postgres',
    password : process.env.DB_PASSWORD || 'postgres',
    database : process.env.DB_NAME || 'germTracker',
    charset  : 'utf8'
  }
};
module.exports= {
  username : process.env.DB_USER || 'postgres',
  password : process.env.DB_PASSWORD || 'postgres',
  database : process.env.DB_NAME || 'germTracker',
  host     : process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
};
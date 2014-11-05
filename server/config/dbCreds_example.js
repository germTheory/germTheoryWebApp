module.exports= {
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : 'your_database_user',
    password : 'your_database_password',
    database : 'myDB',
    charset  : 'utf8',
    ssl      : true
  }
};
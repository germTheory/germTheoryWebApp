var bookshelf = require('../config/dbConfig');

var Location = bookshelf.Model.extend({
  tableName: 'location',
  hasTimestamps: ['createdAt', 'updatedAt']
});

module.exports = ('Location', Location);
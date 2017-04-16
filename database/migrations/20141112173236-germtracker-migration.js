"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    // alter Users table
    migration.changeColumn('users', 'name', { allowNull: false });
    migration.addColumn('users', 'email', { type: DataTypes.STRING, allowNull: false });
    migration.addColumn('users', 'google_id', DataTypes.STRING);
    migration.addColumn('users', 'token', DataTypes.STRING);

    // alter Locations table
    migration.changeColumn('locations', 'latitude', { allowNull: false });
    migration.changeColumn('locations', 'longitude', { allowNull: false });

    // alter Proximity table
    migration.changeColumn('proximity', 'value', { allowNull: false });

    // alter Diseases table
    migration.changeColumn('diseases', 'name', { allowNull: false });

    done();
  },

  down: function(migration, DataTypes, done) {
    done();
  }
};

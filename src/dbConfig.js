const pgp = require('pg-promise')();          // Create Database Connection

const dev_dbConfig = {
	host: 'db',
	port: 5432, 
	database: 'snake_db',
	user: 'postgres',
	password: 'pwd'
};

// Choose config object based on where the app is running
const isProduction = process.env.NODE_ENV === 'production';
const dbConfig = isProduction ? process.env.DATABASE_URL : dev_dbConfig;

// Fixes: https://github.com/vitaly-t/pg-promise/issues/711
if (isProduction) {
	pgp.pg.defaults.ssl = {rejectUnauthorized: false};
}

const db = pgp(dbConfig);

module.exports = { db };
const { Sequelize } = require('sequelize');
const retry = require('retry');
const config = require('../config/config');
const logger = require('../../logger');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Initialize Sequelize instance with PostgreSQL
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Retry function for the health check route
async function databaseConnectionWithRetry() {
  const operation = retry.operation({
    retries: 5,
    factor: 2,
    minTimeout: 1000,
    maxTimeout: 3000,
  });

  return new Promise((resolve, reject) => {
    operation.attempt(async () => {
      try {
        await sequelize.authenticate();
        resolve(true);
        console.log('Database successfully connected');
      } catch (err) {
        if (operation.retry(err)) {
          console.log(`Retrying... Attempt ${operation.attempts()}`);
        } else {
          logger.error('Database connection failed after retries', {
            error: err.message,
            stack: err.stack,
          });
          reject(err);
          process.exit(1);
        }
      }
    });
  });
}

module.exports = {
  sequelize,
  databaseConnectionWithRetry,
};
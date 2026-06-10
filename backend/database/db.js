const{ Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'job_application_tracker',
    password: 'rbsantos1',
    port: 5433
}); 

module.exports = pool;
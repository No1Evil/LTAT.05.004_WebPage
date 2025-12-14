const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres", // Change to ur`s user //UNCOMMENT
    password: "parool",
    database: "testWad",
    host: "localhost", // Change to ur`s IP //UNCOMMENT
    port: "5432"
});

const execute = async(query1, query2) => {
    try {
        await pool.connect(); // create a connection
        await pool.query(query1); // executes a query
        await pool.query(query2)
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createTblQuery1 = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;

const createTblQuery2 = `
    CREATE TABLE IF NOT EXISTS "posttable" (
	    "id" SERIAL PRIMARY KEY,         
	    "title" VARCHAR(200) NOT NULL,
	    "body" VARCHAR(200) NOT NULL,
        "likes" INTEGER DEFAULT 0,
        "urllink" VARCHAR(200),  
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

execute(createTblQuery1, createTblQuery2).then(result => {
    if (result) {
        console.log('Initialized tables "users" and/or "posttable" ');
    }
});

module.exports = pool;
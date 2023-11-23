import { Pool } from 'pg'

const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT),
});

// A user-friendly abstraction for getting access to the database via a pool.
// Connecting this way is the same as getting a client manually, but the variables are set properly, and the clients returned are all connected to a central pool.
export default pool;

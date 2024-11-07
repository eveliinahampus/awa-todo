import { pool } from '../helpers/db.js';

const insertUser = async (email, hashedPassword) => {
    return await pool.query('INSERT INTO account (email, password) VALUES ($1, $2)', [email, hashedPassword]);
};

const selectUserByEmail = async (email) => {
    return await pool.query('SELECT * FROM account WHERE email = $1', [email]);
};


// testuser
const insertTestUser = async (email, password) => {
    return await pool.query('INSERT INTO account (email, password) VALUES ($1, $2)', [email, password]);
};


export { insertUser, selectUserByEmail, insertTestUser };
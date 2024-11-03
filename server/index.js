import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import pkg from 'pg';

const environment = process.env.NODE_ENV

dotenv.config()

const { Pool } = pkg;
const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const openDb = () => {
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})
return pool
}


app.get('/', async (req, res) => {
    const pool = openDb()

    pool.query('SELECT * FROM task', (error, result) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json(result.rows);
    })
});

app.post('/create', async (req, res) => {
    const pool = openDb()

    pool.query('INSERT INTO task (description) VALUES ($1) returning *',
        [req.body.description],
        (error, result) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(200).json({id: result.rows[0].id});
        }
        );
    });

app.delete('/delete/:id', async (req, res) => {
    const pool = openDb();
    const id = req.params.id; // Extract id from request parameters
    
    pool.query(
        'DELETE FROM task WHERE id = $1',
        [id],
        (error, result) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
                return res.status(200).json({ id: id });
         }
     );
});
    

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

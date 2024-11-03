import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import pkg from 'pg';

const { Pool } = pkg;
const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: 'todo',
    port: 5432,
});


app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM task');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/create', async (req, res) => {
    const pool = openDb()

    pool.query('INSERT INTO task (description) VALUES ($1) returning *',
        [req.body.description],
        (error, result) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(200).json(result.rows[0]);
        }
        );
    });

app.delete('/delete/:id', async (req, res) => {
    const pool = openDb()
    pool.query('DELETE FROM task WHERE id = $1', 
       [id],
       (error, result) => {
           if (error) {
               return res.status(500).json({ error: error.message });
           }
           return res.status(200).json({id: id});
        }
        );
    });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

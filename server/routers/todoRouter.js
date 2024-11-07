import { pool } from '../helpers/db.js';
import { Router } from 'express';
import { auth } from '../helpers/auth.js';
//import { getTasks, postTasks } from '../controllers/TaskController.js';

const router = Router();

router.get('/', async (req, res) => {
    pool.query('SELECT * FROM task', (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
            }
            return res.status(200).json(result.rows);
        });
});

router.post('/create', auth, async (req, res) => {
            pool.query('INSERT INTO task (description) VALUES ($1) returning *',
                [req.body.description],
                (error, result) => {
                    if (error) {
                        return res.status(500).json({ error: error.message });
                        }
                        return res.status(200).json(result.rows);
                    });
        });

router.delete('/delete/:id', auth, async (req, res) => {
    //const id = req.params.id; // Extract id from request parameters
    
    pool.query('DELETE FROM task WHERE id = $1',
        [id],
        (error, result) => {
            if (error) {
                return res.status(500).json({ error: error.message });
                }
                return res.status(200).json(result.rows);
            });
});

export default router;
        
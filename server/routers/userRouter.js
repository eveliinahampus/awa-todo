import { pool } from '../helpers/db.js';
import { Router } from 'express';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
const { sign } = jwt;

const router = Router();

router.post('/register', async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (error, hashedPassword) => {
        if (error) next (error) //hash error
        try {
            await pool.query('INSERT INTO account (email, password) VALUES ($1, $2)', 
                [req.body.email, hashedPassword], 
                (error, result) => {
                    if (error) next (error) //database error
                    return res.status(201).json({ id: result.rows[0].id, email: result.rows[0].email })
                    }
                )
                }catch (error) {
            return next(error)
        }
        })
        });

router.post('/login',  async (req, res, next) => {
    const invalid_message = 'Invalid credentials'
    try {
        pool.query('SELECT * FROM account WHERE email = $1',
            [req.body.email],
            (error, result) => {
                if (error) next (error) 
                if (result.rowCount === 0) return next(new Error(invalid_message))
                compare(req.body.password, result.rows[0].password, (error, match) => {
                    if (error) next (error) 
                    if (!match) return next(new Error(invalid_message))
                    const token = sign({user: req.body.email}, process.env.JWT_SECRET_KEY)
                    const user = result.rows[0]
                    return res.status(200).json({ 
                        'id': user.id, 
                        'email': user.email, 
                        'token': token
                    }
                )
                })
                })
        }catch (error) {
            return next(error)
        } 
    });

    export default router;


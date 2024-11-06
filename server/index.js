import express from 'express';
import cors from 'cors';
import todoRouter from './routers/todoRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';
import { pool } from './helpers/db.js';


dotenv.config();
const environment = process.env.NODE_ENV

const port = process.env.PORT 

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', todoRouter);
app.use('/user', userRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ error: err.message });
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

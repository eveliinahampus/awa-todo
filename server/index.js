import express from 'express';
import cors from 'cors';
import todoRouter from './routers/todoRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';

dotenv.config();
//const environment = process.env.NODE_ENV

const port = process.env.PORT 

const app = express();
app.use(cors({ origin: 'http://localhost:3002' })); // frontend is served from port 3002
app.use(express.json()); // Parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', todoRouter);
app.use('/create', todoRouter);
app.use('/user', userRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ error: err.message });
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

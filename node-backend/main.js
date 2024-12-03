import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database.js';
import morgan from 'morgan';

//routes
import userRouter from './routes/user.routes.js';
import fileRouter from './routes/file.routes.js';
import chatRouter from './routes/chat.routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // 'dev' is a predefined format that logs concise colored output
dotenv.config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.use(cors({origin : "*"}));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/files', fileRouter);
app.use('/api/v1/chats', chatRouter);

app.get('/health', (req,res)=>{
    res.send('Server is up and running');   
})

connectDB();

app.listen(port,host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});


import dotenv from 'dotenv';
import express from 'express';
import db from './config/database.js'
import userRoutes from './routes/user.js';
import chatRoutes from './routes/chat.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ info: 'Project Akhir Semester 3 Basis Data Lanjut' });
})

db().then(obj => {
    app.listen(3000, () => {
        console.log(`Server is running on port 3000`);
    })
}).catch(error => {
    console.log('ERROR:', error.message || error);
})

app.use('/users', userRoutes);
app.use('/chats', chatRoutes);
// app.use('/messages', messageRoutes);
// app.use('/rooms', roomRoutes);
// app.use('/members', memberRoutes);
// app.use('/auth', authRoutes);
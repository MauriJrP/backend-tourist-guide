import express from 'express'
const app = express();
import morgan from 'morgan';
require('dotenv').config();
import cors from 'cors';

import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'

app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())

//routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.listen(app.get('port'), () => console.log("Server on port: ", app.get('port')));
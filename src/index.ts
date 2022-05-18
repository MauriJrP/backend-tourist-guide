import express from 'express'
const app = express();
import morgan from 'morgan';
require('dotenv').config();
import cors from 'cors';
import multer from 'multer';
import path from 'path'

import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import placesRoutes from './routes/places.routes';

app.set('port', process.env.PORT || 4000);
// path.join(__dirname, 'public')

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())
app.use(multer({dest: path.join(__dirname, 'public/uploads')}).single('image'))

//routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/places', placesRoutes);

app.listen(app.get('port'), () => console.log("Server on port: ", app.get('port')));
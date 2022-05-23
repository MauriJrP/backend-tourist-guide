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

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

app.set('port', process.env.PORT || 4000);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())
// app.use(multer({ storage, dest: path.join(__dirname, 'public/uploads')}).single('image'));
app.use(multer({ storage, dest: path.join(__dirname, 'public/uploads')}).array('images', 12));
app.use(express.static(path.join(__dirname, 'public/uploads')))

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/comments', placesRoutes);

app.listen(app.get('port'), () => console.log("Server on port: ", app.get('port')));
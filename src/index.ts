import express from 'express'
const app = express();
import morgan from 'morgan';
require('dotenv').config();

import authRoutes from './routes/auth.routes'

app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use(authRoutes);

app.listen(app.get('port'), () => console.log("Server on port: ", app.get('port')));
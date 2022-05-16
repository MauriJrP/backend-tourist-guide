import {Request, Response} from 'express'
import {mysqlConnection} from '../database';
import jwt from 'jsonwebtoken';
import { LoginType, SignupType } from '../schemas/auth.schema';
import bcrypt from 'bcryptjs'


export const signup = (req: Request<unknown, unknown, SignupType>, res: Response) => {
  const {name, age, email, gender, password} = req.body;

  //* -------- ------- ------ ----- Insert ----- ------ ------- --------
  const query = 
  `INSERT INTO users (name, email, password, idRole, age, gender)
  VALUES (?, ?, ?, (SELECT idRole FROM roles WHERE role =?), ?, ?);`;

  const hash = bcrypt.hashSync(password, 10);
  const role = 'user';

  mysqlConnection.query(query, [name, email, hash, role, age, gender], (err, rows, fields) => {
    if (!err) {
      console.log("Funciono?")
      res.json(rows);
    } else {
      console.log(err);
    }
  });
}

export const login = (req: Request<unknown, unknown, LoginType>, res: Response) => {
  const {email, password} = req.body;
  mysqlConnection.query(`SELECT * FROM users WHERE email="?"`, [email])

  //* -------- ------- ------ ----- Generate token ----- ------ ------- --------
  const id = "1";
  const token = jwt.sign({id}, process.env.SECRET_KEY || '12345', {
    expiresIn: 60*1 //1 min
  })

  //* -------- ------- ------ ----- Response ----- ------ ------- --------
  res.json({token});
}
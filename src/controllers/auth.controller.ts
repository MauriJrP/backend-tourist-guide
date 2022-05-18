import {Request, Response} from 'express'
import {mysqlConnection} from '../database';
import jwt from 'jsonwebtoken';
import { LoginType, SignupType } from '../schemas/auth.schema';
import bcrypt from 'bcryptjs'


export const signup = (req: Request<unknown, unknown, SignupType>, res: Response) => {
  const {name, age, email, gender, password} = req.body;

  const query = 
  `INSERT INTO users (name, email, password, idRole, age, gender)
  VALUES (?, ?, ?, (SELECT idRole FROM roles WHERE role =?), ?, ?);`;

  const hash = bcrypt.hashSync(password, 10);
  const role = 'user';

  mysqlConnection.query(query, [name, email, hash, role, age, gender], (err, rows, fields) => {
    try {
      console.log(err);
      if (err) res.json([{message: "Email already in use"}]);
      else res.json([{message: rows.message}]);
    } catch (error) {
      console.log(error);
    }
  });
}

export const login = (req: Request<unknown, unknown, LoginType>, res: Response) => {
  const {email, password} = req.body;
  const query = `SELECT * FROM users WHERE email=?`;
  mysqlConnection.query(query, [email], (err, rows, fields) => {
    try {
      if (err) res.json([{message: "Query error"}]);
      else {
        if (rows.length === 0) res.json([{message: "User not found"}]);
        if (bcrypt.compareSync(password, rows[0].password)) {
          const token = jwt.sign({ id: rows[0].idUser }, process.env.SECRET_KEY || '123', {
            expiresIn: 60*10 //1 min
          })
          res.json([{token, user: rows[0]}]);
        }
        else res.json([{message: "Wrong password"}])
      } 
    } catch (error) {
      console.log(error);
    }
  });
}
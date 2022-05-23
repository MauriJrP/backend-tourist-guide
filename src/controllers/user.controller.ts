import {Request, Response} from 'express';
import { mysqlConnection } from '../database';
import { updateUserParamsType, updateUserType } from '../schemas/user.schema';
import bcrypt from 'bcryptjs'

export const updateUser = (req: Request<any, unknown, updateUserType>, res: Response) => {
  console.log("test");
  const {name, email, password} = req.body;
  const {idUser} = req.params
  const hash = bcrypt.hashSync(password, 10);
  const query = 
  `UPDATE users
  SET 
    name = ?,
    email = ?,
    password = ?
  WHERE idUser = ?
  ;`

  mysqlConnection.query(query, [name, email, hash, parseInt(idUser)], (err, rows, fields) => {
    if (err) res.json([{message: err.sqlMessage}]);
    else {
      res.json([{message: "ok"}])
    }
  })
}

export const deleteUser = (req: Request, res: Response) => {
  res.json({message: 'deleteUser'});
}

export const getAllUsers = (req: Request, res: Response) => {
  res.json({message: 'getAllUsers'});
}

export const getUserById = (req: Request, res: Response) => {
  res.json({message: 'getUserById'});
}
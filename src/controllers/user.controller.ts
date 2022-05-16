import {Request, Response} from 'express';
import { mysqlConnection } from '../database';

export const updateUser = (req: Request, res: Response) => {
  res.json({message: 'updateUser'});
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
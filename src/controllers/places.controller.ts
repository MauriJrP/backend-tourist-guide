import {Request, Response} from 'express';
import { mysqlConnection } from '../database';

export const getPlacesPage = (req: Request, res: Response) => {
  const {page} = req.body
  const last = parseInt(page) * 20;
  const first = last - 19;
  const query = `SELECT idPlace, name, description, rate FROM places Limit ?,?`;
  mysqlConnection.query(query, [first, last], (err, rows, fields) => {
    if (!err) res.json(rows);
    else console.log(err);
  })

}

export const getPlaceById = (req: Request, res: Response) => {

}

export const createPlace = (req: Request, res: Response) => {

}

export const updatePlaceById = (req: Request, res: Response) => {

}

export const deletePlaceById = (req: Request, res: Response) => {

}
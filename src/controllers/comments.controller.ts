import {Request, Response} from 'express';
import { mysqlConnection } from '../database';

export const getPlaceComments = (req: Request, res: Response) => {
  const {idPlace} = req.params;
  console.log(idPlace);
  const query = 
  `SELECT * FROM ratings
  WHERE idPlace = ?`

  mysqlConnection.query(query, [idPlace], (err, rows, fields) => {
    if (err) console.log(err);
    else console.log({comments: rows});
    // else res.json([{comments: rows}]);
  })
}

export const createComment = (req: Request, res: Response) => {
  
}

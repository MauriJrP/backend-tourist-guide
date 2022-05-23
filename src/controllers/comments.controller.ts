import {Request, Response} from 'express';
import { mysqlConnection } from '../database';
import { CommentType } from '../schemas/comment.schema';

export const getPlaceComments = (req: Request, res: Response) => {
  const {idPlace} = req.params;
  console.log(idPlace);
  const query = 
  `SELECT c.idComment, c.ratingDate, c.rating, c.comment, c.idUser, u.name  FROM comments AS c
  JOIN users AS u ON c.idUser = u.idUser
  WHERE idPlace = ?;
  `

  mysqlConnection.query(query, [parseInt(idPlace)], (err, rows, fields) => {
    if (err) console.log(err);
    else res.json([{comments: rows}]);
    // else res.json([{comments: rows}]);
  })
}

export const createComment = (req: Request<unknown, unknown, CommentType>, res: Response) => {
  const {idUser, rating, comment, idPlace} = req.body;

  const queryCommentFromUser =
  `SELECT * FROM comments
  WHERE idPlace = ? AND idUser = ?;`

  const queryCreate = 
  `INSERT INTO comments (idPlace, idUser, comment, rating)
  VALUES (?, ?, ?, ?);`

  const queryUpdate =
  `UPDATE comments
  SET
    comment = ?,
    rating = ?
  WHERE idPlace = ? AND idUser = ?;`

  mysqlConnection.query(queryCommentFromUser, [idPlace, idUser], (err, rows, fields) => {
    if (err) console.log(err);
    else {
      if (rows.length === 0) {
        mysqlConnection.query(queryCreate, [idPlace, idUser, comment, rating], (err, rows, fields) => {
          if (err) console.log(err)
          else res.json([{message: "ok"}]);
        })
      } else {
        mysqlConnection.query(queryUpdate, [comment, rating, idPlace, idUser], (err, rows, fields) => {
          if (err) console.log(err)
          else res.json([{message: "ok"}]);
        })
      }
    }
  })
}

export const deleteComment = (req: Request, res: Response) => {
  const {idComment} = req.params;
  console.log("test");
  console.log(req.params);
  const query =
  `DELETE FROM comments
  WHERE idComment = ?;`

  mysqlConnection.query(query, [parseInt(idComment)], (err, rows, fields) => {
    if (err) console.log(err);
    else res.json([{message: 'ok'}]);
  })
}
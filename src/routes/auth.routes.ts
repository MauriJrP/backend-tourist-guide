import {Router} from 'express';
const router: Router = Router();

import {mysqlConnection} from '../database';

router.get('/', (req, res) => {
  const query = `SELECT * FROM students`;
  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
  // res.send("Auth");
})

export default router;
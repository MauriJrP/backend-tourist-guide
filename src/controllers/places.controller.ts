import {Request, Response} from 'express';
import { mysqlConnection } from '../database';
import { PlaceType } from '../schemas/places.schema';

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

export const getPlaceTypes = (req: Request, res: Response) => {
  const query = `SELECT * FROM placeTypes`
  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) console.log(err)
    else res.json(rows);
  })
}

export const getLocations = (req: Request, res: Response) => {
  const query = `SELECT * FROM locations`
  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) console.log(err)
    else res.json(rows);
  })
}

export const createPlace = (req: Request<unknown, unknown, PlaceType>, res: Response) => {
  const {address, description, name, openingHours, phone, placeType, price, manager, location} = req.body;
  const query = 
  `INSERT INTO places (name, address, phone, openingHours, manager, price, idPlaceType, description, idLocation)
  VALUES
    (?, ?, ?, ?, ?, ?, (SELECT idPlaceType FROM placeTypes WHERE placeType=?), ?, (SELECT idLocation FROM locations WHERE location=?))`;
  
  console.log(req.body);
  mysqlConnection.query(query, [name, address, phone, openingHours, manager, price, placeType, description, location], (err, rows, fields) => {
    try {
      if (err) res.json([{message: err.sqlMessage}]);
      else res.json([{message: '', insertedId: rows.insertId}]);
      
    } catch (error) {
      console.log(error);
    }
  })
}

export const addGallery = (req: Request, res: Response) => {
  console.log("entro a addGallery")
  console.log(req.files);
  res.json([{message: "createPlace"}])
}

export const updatePlaceById = (req: Request, res: Response) => {

}

export const deletePlaceById = (req: Request, res: Response) => {

}
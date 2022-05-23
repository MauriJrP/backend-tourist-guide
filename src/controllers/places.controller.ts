import {query, Request, Response} from 'express';
import multer, { Multer } from 'multer';
import { mysqlConnection } from '../database';
import { IPlace } from '../models/types';
import { FilterType, PlaceType } from '../schemas/places.schema';

export const getPlacesPage = (req: Request, res: Response) => {
  const {pageNum} = req.params;
  const last = parseInt(pageNum) * 20;
  const first = last - 20;
  // const query = `SELECT idPlace, name, description, rating FROM places Limit ?,?`;
  const query = 
  `SELECT p.idPlace, p.name, p.description, p.rating, MIN(ph.photo) AS photo
  FROM places AS p
  JOIN gallery AS g ON p.idPlace = g.idPlace
  JOIN galleryDetail AS gd ON g.idGallery = gd.idGallery
  JOIN photos AS ph ON ph.idPhoto = gd.idPhoto
  GROUP BY idPlace
  LIMIT ?,?
  ;`;
  mysqlConnection.query(query, [first, last], (err, rows, fields) => {
    if (!err) res.json([{places: rows}]);
    else console.log(err);
  })
}
export const getFilteredPlacesPage = (req: Request<any, unknown, FilterType>, res: Response) => {
  const {pageNum} = req.params;
  const last = parseInt(pageNum) * 20;
  const first = last - 20;
  const {idLocation, idPlaceType, price, rating} = req.body;
  let andFlag = false;
  let filters = ``;
  if (idLocation) {
    filters += `idLocation = ${idLocation}`
    andFlag = true;
  } 
  if (idPlaceType) {
    if (andFlag) filters += ` AND idPlaceType = ${idPlaceType}`;
    else {
      filters += `idPlaceType = ${idPlaceType}`;
      andFlag = true;
    }
  }
  if (price) {
    if (andFlag) filters += ` AND price <= ${price}`;
    else {
      filters += `price = ${price}`;
      andFlag = true;
    }
  }
  if (rating) {
    if (andFlag) filters += ` AND rating >= ${rating}`;
    else {
      filters += `rating = ${rating}`;
      andFlag = true;
    }
  }
  const query = 
  `SELECT p.idPlace, p.name, p.description, p.rating, MIN(ph.photo) AS photo
  FROM places AS p
  JOIN gallery AS g ON p.idPlace = g.idPlace
  JOIN galleryDetail AS gd ON g.idGallery = gd.idGallery
  JOIN photos AS ph ON ph.idPhoto = gd.idPhoto
  WHERE ${filters}
  GROUP BY idPlace
  LIMIT ?,?
  ;`;
  // console.log(query);
  mysqlConnection.query(query, [first, last], (err, rows, fields) => {
    if (!err) res.json([{message: "ok", places: rows}]);
    else {
      console.log(err);
      res.json([{message: "Query Error"}])
    }
  })
}

export const getPlaceById = (req: Request, res: Response) => {
  const {placeId} = req.params;
  const queryPlace = 
  `SELECT idPlace, name, address, phone, openingHours, price, rating, description, placeType, location
  FROM places AS p
  JOIN placeTypes AS pt ON p.idPlaceType = pt.idPlaceType
  JOIN locations AS l ON p.idLocation = l.idLocation
  WHERE idPlace = ?;
  `
  const queryGalleries = 
  `SELECT idGallery, name
  FROM gallery
  WHERE idPlace = ?;
  `

  const queryPhotos = 
  `SELECT DISTINCT p.photo
  FROM photos AS p
  JOIN galleryDetail AS gd ON gd.idPhoto = p.idPhoto
  JOIN gallery AS g ON gd.idGallery = ?;
  `
  
  let place: IPlace = {
    idPlace: 0,
    name: '',
    address: '',
    phone: '',
    openingHours: '',
    price: 0,
    rating: 0,
    placeType: '',
    location: '',
    description: '',
    galleries: []
  };

  const getPhotos = (err: any, rows: any, fields: any) => {
    let total: number = rows.length;

    rows.forEach((gallery: {idGallery: number; name: string;}) => {
      mysqlConnection.query(queryPhotos, [gallery.idGallery], (err, rows, fields) => {
        // console.log("test");
        // console.log(photos);
        const photos = rows.map((row: any) => row.photo)
        place.galleries.push({name: gallery.name, images: (photos as string[])});
        --total;
        // if (total === 0) console.log(place);
        if (total === 0) res.json([place]);
      })
    })
  }

  const getGalleries = (err: any, rows: any, fields: any) => {
    place = {...place, ...rows[0]}
    try {
      mysqlConnection.query(queryGalleries, [placeId], getPhotos)
    } catch (error) {
      res.json([{message: "Query errors"}])
    }
  }

  mysqlConnection.query(queryPlace, [placeId], getGalleries)

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
  // console.log(req.files);
  // console.log(req.body);

  // console.log(typeof (req.files as Express.Multer.File[]))
  // console.log(req.files as Express.Multer.File[])
  const photoUrls = (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => file.filename);

  const {name, placeId} = req.body;
  const queryGallery = 
    `INSERT INTO gallery (name, idPlace)
    VALUES (?, ?)`
  const queryPhoto = 
    `INSERT INTO photos (photo)
    VALUES (?)`
  const queryGalleryDetail =
    `INSERT INTO galleryDetail (idGallery, idPhoto)
    VALUES (?, ?)`


  const addPhotos = (err: any, rows: any, fields: any) => {
    try {
      const galleryId = rows.insertId;
      photoUrls.forEach((photoUrl) => {
        mysqlConnection.query(queryPhoto, [photoUrl], (photoErr, photoRows, photoFields) => {
          const photoId = photoRows.insertId;
          mysqlConnection.query(queryGalleryDetail, [galleryId, photoId], (GDErr, GDRows, GDFields) => {
            if (GDErr) console.log(GDErr);
            // else res.json([{message: "Everything Correct!"}]);
          });
        })
      })
    } catch (error) {
      res.json([{message: "Query errors"}])
    }
  }

  mysqlConnection.query(queryGallery, [name, placeId], addPhotos);

}

export const updatePlaceById = (req: Request, res: Response) => {

}

export const deletePlaceById = (req: Request, res: Response) => {

}
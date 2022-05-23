DROP DATABASE `tourist-guide`;
CREATE DATABASE IF NOT EXISTS `tourist-guide`;

USE `tourist-guide`;

CREATE TABLE roles (
  idRole INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  role VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE users (
  idUser INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(254) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  idRole INT DEFAULT(1) NOT NULL,
  age INT NOT NULL,
  gender CHAR NOT NULL DEFAULT("U"),
  muted BOOL DEFAULT false,
  FOREIGN KEY (idRole) REFERENCES roles(idRole),
  CHECK (gender='F' OR gender='M' OR gender='U')
);

CREATE TABLE placeTypes (
	idPlaceType INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	placeType VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE locations (
    idLocation INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    location varchar(50) NOT NULL UNIQUE
);

CREATE TABLE places (
    idPlace INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    address VARCHAR(200) NOT NULL UNIQUE,
    phone VARCHAR(10) UNIQUE,
    openingHours VARCHAR(11) NOT NULL,
    manager VARCHAR(50) DEFAULT("No aplica"),
    price INT DEFAULT '0' NOT NULL,
    idPlaceType INT NOT NULL,
    description VARCHAR(500) NOT NULL,
    idLocation INT NOT NULL,
    rating FLOAT DEFAULT 0,
    FOREIGN KEY(idPlaceType) REFERENCES placeTypes(idPlaceType),
    FOREIGN KEY(idLocation) REFERENCES locations(idLocation),
    CHECK (rating >= 0 AND rating <= 5)
);

CREATE TABLE comments (
    idComment INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    idPlace INT NOT NULL,
    idUser INT NOT NULL,
    comment varchar(200),
    rating FLOAT,
    ratingDate date DEFAULT(CURRENT_DATE),
    FOREIGN KEY(idPlace) REFERENCES places(idPlace),
    FOREIGN KEY(idUser) REFERENCES users(idUser),
    CHECK (rating >= 0 AND rating <= 5)
);

CREATE TABLE photos (
    idPhoto INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    photo varchar(200) NOT NULL,
    defaultPhoto BOOL DEFAULT false
);

CREATE TABLE gallery (
    idGallery INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name varchar(200) NOT NULL,
    idPlace INT NOT NULL,
    FOREIGN KEY(idPlace) REFERENCES places(idPlace)
);

CREATE TABLE galleryDetail (
    idGalleryDetail INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    idGallery INT NOT NULL,
    idPhoto INT NOT NULL,
    FOREIGN KEY(idGallery) REFERENCES gallery(idGallery),
    FOREIGN KEY(idPhoto) REFERENCES photos(idPhoto)
);

INSERT INTO roles (role)
VALUES
  ("user"),
  ("admin")
;

INSERT INTO users (name, email, password, idRole, age, gender)
VALUES 
  ('Mauricio', "maurijrp2001@gmail.com", "$2y$10$Z.u2MDGjtDRlZLd.XudyAuuNxsAxmE65ezVMowpZhKj/gaiLWi/Fy", (SELECT idRole FROM roles WHERE role ='admin'), 18, "M")
;

INSERT INTO placeTypes (placeType)
VALUES
  ("Comida"),
  ("Cultural"),
  ("Deportivo"),
  ("Natural"),
  ("Salud"),
  ("Autoservicio"),
  ("Souvenirs")
;

INSERT INTO locations (location)
VALUES
  ("Guadalajara"),
  ("Puerto Vallarta"),
  ("Zapopan"),
  ("Tequila")
;

-- SELECT p.idPlace, p.name, p.description, p.rating, MIN(ph.photo) AS photo
-- FROM places AS p
-- JOIN gallery AS g ON p.idPlace = g.idPlace
-- JOIN galleryDetail AS gd ON g.idGallery = gd.idGallery
-- JOIN photos AS ph ON ph.idPhoto = gd.idPhoto
-- GROUP BY idPlace
-- LIMIT 0,20
-- ;

-- SELECT idPlace, name, address, phone, openingHours, price, rating, description, placeType, location
-- FROM places AS p
-- JOIN placeTypes AS pt ON p.idPlaceType = pt.idPlaceType
-- JOIN locations AS l ON p.idLocation = l.idLocation
-- WHERE idPlace = 1;

-- SELECT idGallery, name
-- FROM gallery
-- WHERE idPlace = placeId;

-- SELECT DISTINCT p.photo, p.idPhoto
-- FROM photos AS p
-- JOIN galleryDetail AS gd ON gd.idPhoto = p.idPhoto
-- JOIN gallery AS g ON gd.idGallery = 2;

-- INSERT INTO comments (idPlace, idUser, comment, rating)
--   VALUES (1, 2, "excelente servicio", 3);

-- DELETE FROM comments
--   WHERE idComment = 1;

-- SELECT c.idComment, c.ratingDate, c.rating, c.comment, c.idUser, u.name  FROM comments AS c
-- JOIN users AS u ON c.idUser = u.idUser
-- WHERE idPlace = 1;

CREATE DATABASE IF NOT EXISTS `tourist-guide`;

USE `tourist-guide`;

-------- ------- ------ ----- tables ----- ------ ------- --------

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
  gender CHAR NOT NULL DEFAULT="U",
  muted BOOL DEFAULT false,
  FOREIGN KEY (idRole) REFERENCES roles(idRole),
  CHECK (gender='F' OR gender='M' OR gender='U')
);

CREATE TABLE placeTypes (
	idPlaceType INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	placeType VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE places (
    idPlace INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    address VARCHAR(200) NOT NULL,
    phone VARCHAR(10) UNIQUE,
    manager VARCHAR(50) DEFAULT="No aplica",
    price INT DEFAULT '0' NOT NULL,
    idPlaceType INT,
    description VARCHAR(500) NOT NULL,
    idLocation INT,
    rating float,
    FOREIGN KEY(idPlaceType) REFERENCES placeType(idPlaceType),
    FOREIGN KEY(idLocation) REFERENCES locations(idLocation),
    CHECK (rating >= 0 AND rating <= 5)
);



-------- ------- ------ ----- Insertions ----- ------ ------- --------

INSERT INTO roles (role)
VALUES
  ("user"),
  ("admin")
;

INSERT INTO users (name, email, password, idRole, age, gender)
VALUES ('Mauricio', "maurijrp2001@gmail.com", "12345678", (SELECT idRole FROM roles WHERE role ='admin'), 18, "M");

INSERT INTO users (name, email, password, idRole, age, gender)
VALUES ('Juanito', "juanito@gmail.com", "12345678", (SELECT idRole FROM roles WHERE role ='user'), 18, "M");

INSERT INTO users (name, email, password, idRole, age, gender)
VALUES ('Juanito', "juanito@gmailx.com", "12345678", (SELECT idRole FROM roles WHERE role ='user'), 18, "X");

DELETE FROM users WHERE users.email="juanito@gmailx.com";
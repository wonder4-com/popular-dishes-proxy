DROP DATABASE IF EXISTS restaurantinfo;

CREATE DATABASE restaurantinfo;

USE restaurantinfo;



CREATE TABLE restaurants (
  id INT NOT NULL AUTO_INCREMENT,
  category varchar(100),
  restaurantname varchar(100),
  claimed varchar(10),
  prize varchar(10),
  PRIMARY KEY (id)
);


CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT,
  -- user_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  -- comment VARCHAR(255) NOT NULL,
  rating INT NOT NULL,
  date DATE,
  PRIMARY KEY (id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants (id)
);


-- CREATE TABLE Users (
--   _id int NOT NULL AUTO_INCREMENT,
--   username varchar(100),
--   email varchar(100),
--   streetAddress varchar(100),
--   city varchar(50),
--   states varchar(50),
--   zip int NOT Null,
--   phone varchar(50),
-- );


  -- streetAddress varchar(100),
  -- city varchar(100),
  -- states varchar(100),
  -- zip int NotNull,
  -- phone varchar(50),
  -- webAddress varchar(100),
  -- menuAddress varchar(100),
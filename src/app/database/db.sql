CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) DEFAULT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  provincia VARCHAR(255) DEFAULT NULL,
  ciudad VARCHAR(255) DEFAULT NULL,
  distrito VARCHAR(255) DEFAULT NULL,
  address VARCHAR(255) DEFAULT NULL,
  last_name VARCHAR(255) DEFAULT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO
  users (
    name,
    email,
    password,
    provincia,
    ciudad,
    distrito,
    address,
    last_name
  )
VALUES
  (
    'John',
    'john@example.com',
    'password123',
    'Provincia 1',
    'Ciudad 1',
    'Distrito 1',
    'Address 1',
    'Doe'
  ),
  (
    'Jane',
    'jane@example.com',
    'password456',
    'Provincia 2',
    'Ciudad 2',
    'Distrito 2',
    'Address 2',
    'Doe'
  ),
  (
    'Alice',
    'alice@example.com',
    'password789',
    'Provincia 3',
    'Ciudad 3',
    'Distrito 3',
    'Address 3',
    'Smith'
  ),
  (
    'Bob',
    'bob@example.com',
    'passwordabc',
    'Provincia 4',
    'Ciudad 4',
    'Distrito 4',
    'Address 4',
    'Smith'
  ),
  (
    'Emma',
    'emma@example.com',
    'passworddef',
    'Provincia 5',
    'Ciudad 5',
    'Distrito 5',
    'Address 5',
    'Johnson'
  ),
  (
    'Michael',
    'michael@example.com',
    'passwordghi',
    'Provincia 6',
    'Ciudad 6',
    'Distrito 6',
    'Address 6',
    'Johnson'
  ),
  (
    'Sophia',
    'sophia@example.com',
    'passwordjkl',
    'Provincia 7',
    'Ciudad 7',
    'Distrito 7',
    'Address 7',
    'Wilson'
  ),
  (
    'William',
    'william@example.com',
    'passwordmno',
    'Provincia 8',
    'Ciudad 8',
    'Distrito 8',
    'Address 8',
    'Wilson'
  ),
  (
    'Olivia',
    'olivia@example.com',
    'passwordpqr',
    'Provincia 9',
    'Ciudad 9',
    'Distrito 9',
    'Address 9',
    'Martinez'
  ),
  (
    'James',
    'james@example.com',
    'passwordstu',
    'Provincia 10',
    'Ciudad 10',
    'Distrito 10',
    'Address 10',
    'Martinez'
  );

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  color VARCHAR(50),
  details TEXT DEFAULT NULL,
  images JSON DEFAULT (
    JSON_ARRAY(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKHg2CkUvmBCuVM595E7x2qR1Gv1AsDn1pxIY72e1I9w&s"
    )
  ),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO
  products (name, description, price, color, details)
VALUES
  (
    'Product 1',
    'Description for Product 1',
    29.99,
    'Red',
    '["Detalle 1","Detalle 2","Detalle 3"]'
  ),
  (
    'Product 2',
    'Description for Product 2',
    39.99,
    'Blue',
    '["Detalle 4","Detalle 5","Detalle 6"]'
  ),
  (
    'Product 3',
    'Description for Product 3',
    19.99,
    'Green',
    '["Detalle 7","Detalle 8","Detalle 9"]'
  ),
  (
    'Product 4',
    'Description for Product 4',
    49.99,
    'Yellow',
    '["Detalle 10","Detalle 11","Detalle 12"]'
  ),
  (
    'Product 5',
    'Description for Product 5',
    59.99,
    'Black',
    NULL
  ),
  (
    'Product 6',
    'Description for Product 6',
    69.99,
    'White',
    NULL
  ),
  (
    'Product 7',
    'Description for Product 7',
    79.99,
    'Purple',
    '["Detalle 13","Detalle 14","Detalle 15"]'
  ),
  (
    'Product 8',
    'Description for Product 8',
    89.99,
    'Orange',
    NULL
  ),
  (
    'Product 9',
    'Description for Product 9',
    99.99,
    'Pink',
    '["Detalle 16","Detalle 17","Detalle 18"]'
  ),
  (
    'Product 10',
    'Description for Product 10',
    109.99,
    'Brown',
    '["Detalle 19","Detalle 20","Detalle 21"]'
  );

CREATE TABLE super_user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

INSERT INTO
  super_user (username, password)
VALUES
  ('kakaroto', 'kakaroto');
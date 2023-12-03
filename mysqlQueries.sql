CREATE TABLE user(
    id INT AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(50) UNIQUE, 
    password VARCHAR(50),
    type VARCHAR(50),
    PRIMARY KEY(ID)
);

INSERT INTO user(name, email, password, type) VALUES("Sumit Mandal", "sumit.mandal0123@gmail.com", "sumit@123", "customer");
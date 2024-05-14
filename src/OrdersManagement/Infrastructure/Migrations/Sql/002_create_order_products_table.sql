CREATE TABLE IF NOT EXISTS Orders_Products (
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    price FLOAT NOT NULL,
    cantidad INT NOT NULL,
    PRIMARY KEY (id)
    );
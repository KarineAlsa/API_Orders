CREATE TABLE IF NOT EXISTS Orders_Products (
    id INT NOT NULL AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    price FLOAT NOT NULL,
    cantidad INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES Orders(id)
    );
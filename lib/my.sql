CREATE TABLE
    IF NOT EXISTS seller (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        taxInformation TEXT,
        shippingPolicies TEXT,
        returnPolicies TEXT,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    IF NOT EXISTS category (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    IF NOT EXISTS product (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        slug VARCHAR(255) NOT NULL UNIQUE,
        price DECIMAL(10, 2) NOT NULL,
        stock INT UNSIGNED NOT NULL,
        totalSold INT UNSIGNED NOT NULL DEFAULT 0,
        category VARCHAR(255),
        sellerId INT UNSIGNED,
        FOREIGN KEY (sellerId) REFERENCES seller (id) on delete set null on update no action,
        FOREIGN KEY (category) REFERENCES category (name),
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
-- Product image table
CREATE TABLE
    IF NOT EXISTS product_image (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        productId INT UNSIGNED,
        url TEXT NOT NULL,
        FOREIGN KEY (productId) REFERENCES product (id) on delete cascade
    );

-- Refresh token table
CREATE TABLE IF NOT EXISTS refresh_token (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        token VARCHAR(255) NOT NULL,
        userId INT UNSIGNED,
        userType VARCHAR(100) NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
-- Payment method table
CREATE TABLE IF NOT EXISTS payment_method (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name ENUM('BankTransfer', 'MobileBanking', 'CashOnDelivery') NOT NULL,
        company VARCHAR(255),
        description TEXT,
        sellerId INT UNSIGNED,
        FOREIGN KEY (sellerId) REFERENCES seller (id) on delete cascade,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

-- Customer table
CREATE TABLE IF NOT EXISTS customer (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    password VARCHAR(255),
    address TEXT,
    isGuest BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS `order` (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customerId INT UNSIGNED,
    customerName VARCHAR(255) NOT NULL,
    customerEmail VARCHAR(255) NOT NULL,
    customerPhone VARCHAR(255) NOT NULL,
    paymentMethodId INT UNSIGNED,
    status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
    totalAmount DECIMAL(10,2) NOT NULL,
    shippingAddress TEXT,
    placedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerId) REFERENCES customer(id) ON DELETE SET NULL,
    FOREIGN KEY (sellerId) REFERENCES seller(id) ON DELETE SET NULL,
    FOREIGN KEY (paymentMethodId) REFERENCES payment_method(id) ON DELETE SET NULL
);

-- Order items
CREATE TABLE IF NOT EXISTS order_item (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    orderId INT UNSIGNED NOT NULL,
    productId INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (orderId) REFERENCES `order`(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES product(id) ON DELETE CASCADE
);

-- Cart items
CREATE TABLE IF NOT EXISTS cart_item (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customerId INT UNSIGNED NOT NULL,
    productId INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    FOREIGN KEY (customerId) REFERENCES customer(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES product(id) ON DELETE CASCADE
);

-- Full-text search index
CREATE FULLTEXT INDEX idx_fulltext_search
ON product (name, category);

DROP FUNCTION IF EXISTS generate_slug;
DELIMITER / /
CREATE FUNCTION generate_slug (product_name VARCHAR(255)) RETURNS VARCHAR(255) DETERMINISTIC BEGIN DECLARE slug VARCHAR(255);
DECLARE random_suffix CHAR(3);
-- Replace spaces with underscores and remove punctuation
SET
    slug = LOWER(REPLACE (product_name, ' ', '_'));
SET
    slug = REGEXP_REPLACE (slug, '[^a-zA-Z0-9_]', '');
-- Generate a random 3-digit number and append it to the slug
SET
    random_suffix = LPAD (FLOOR(RAND () * 1000), 3, '0');
SET
    slug = CONCAT (slug, '_', random_suffix);
RETURN slug;
END;
/ / DELIMITER;

DROP TRIGGER IF EXISTS before_product_insert;

DELIMITER / / CREATE TRIGGER before_product_insert BEFORE INSERT ON product FOR EACH ROW BEGIN DECLARE cat_name varchar(255);

-- Check if the category already exists
SELECT name INTO cat_name
FROM
    category
WHERE
    cat_name = NEW.category;

-- If category does not exist, insert it
IF cat_name IS NULL THEN
INSERT INTO
    category (name)
VALUES
    (NEW.category);

ELSE
-- Use the existing category id
SET
    NEW.category = cat_name;

END IF;

END;

/ / DELIMITER;

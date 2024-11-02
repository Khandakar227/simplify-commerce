import { createConnection, createPool } from 'mysql2/promise';

const databaseName = process.env.MYSQL_DATABASE || 'mydatabase';
const databaseUser = process.env.MYSQL_USER || 'root';
const databasePassword = process.env.MYSQL_PASSWORD || 'password';
const databaseHost = process.env.MYSQL_HOST || 'localhost';

export const pool = createPool({
    database: databaseName,
    user: databaseUser,
    password: databasePassword,
    host: databaseHost,
    waitForConnections: true,
    connectionLimit: 20,
});


export const init = async () => {
    try {
        const connection = await createConnection({
            host: databaseHost,
            user: databaseUser,
            password: databasePassword,
        });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`);
        await connection.query(`USE \`${databaseName}\`;`);
        // Seller table
        await connection.query(`CREATE TABLE IF NOT EXISTS seller (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    taxInformation TEXT,
    shippingPolicies TEXT,
    returnPolicies TEXT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`);
        // Category table
        await connection.query(`CREATE TABLE IF NOT EXISTS category (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`);
        // Product table
        await connection.query(`
    CREATE TABLE IF NOT EXISTS product (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    slug VARCHAR(255) NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    stock INT UNSIGNED NOT NULL,
    category VARCHAR(255),
    sellerId INT UNSIGNED,
    FOREIGN KEY (sellerId) REFERENCES seller(id) on delete set null on update no action,
    FOREIGN KEY (category) REFERENCES category(name),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS product_image (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            productId INT UNSIGNED,
            url TEXT NOT NULL,
            FOREIGN KEY (productId) REFERENCES product(id) on delete cascade
            );`);

    await connection.query(`CREATE TABLE IF NOT EXISTS refresh_token (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        token VARCHAR(255) NOT NULL,
        userId INT UNSIGNED,
        userType VARCHAR(100) NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`)

    await connection.query(`CREATE TABLE IF NOT EXISTS payment_method (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name ENUM('BankTransfer', 'MobileBanking', 'CashOnDelivery') NOT NULL,
        company VARCHAR(255),
        description TEXT,
        sellerId INT UNSIGNED,
        FOREIGN KEY (sellerId) REFERENCES seller (id) on delete cascade,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`);

    await connection.query(`DROP FUNCTION IF EXISTS generate_slug;`);
    await connection.query(`
    CREATE FUNCTION generate_slug(product_name VARCHAR(255)) 
    RETURNS VARCHAR(255)
    DETERMINISTIC
    BEGIN
        DECLARE slug VARCHAR(255);
        DECLARE random_suffix CHAR(3);
        
        -- Replace spaces with underscores and remove punctuation
        SET slug = LOWER(REPLACE(product_name, ' ', '_'));
        SET slug = REGEXP_REPLACE(slug, '[^a-zA-Z0-9_]', '');
        
        -- Generate a random 3-digit number and append it to the slug
        SET random_suffix = LPAD(FLOOR(RAND() * 1000), 3, '0');
        SET slug = CONCAT(slug, '_', random_suffix);

        RETURN slug;
    END;
`);
    // Trigger
    await connection.query(`DROP TRIGGER IF EXISTS before_product_insert;`);
    await connection.query(`
        CREATE TRIGGER before_product_insert
        BEFORE INSERT ON product
        FOR EACH ROW
        BEGIN
            DECLARE cat_name VARCHAR(255);

            -- Check if the category already exists
            SELECT name INTO cat_name FROM category WHERE name = NEW.category;

            -- If category does not exist, insert it
            IF cat_name IS NULL THEN
                INSERT INTO category (name) VALUES (NEW.category);
            END IF;
        END;
    `);

    await connection.query(`CREATE FULLTEXT INDEX idx_fulltext_search ON product (name, category);`);
    await connection.end();
   } catch (error) {
       console.log(error);
   }
}

export default pool;

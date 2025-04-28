import pool from '@/lib/conn';

export interface IProduct {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    sellerId: number;
    pictures: string[];
};

class Product {
    static async create(data: { name: string, description: string, price: number, stock: number, category: string, pictures: string[], sellerId: number }) {
        const result = await pool.execute(`INSERT INTO product (name, description, price, stock, category, sellerId, slug) VALUES (?, ?, ?, ?, ?, ?, generate_slug(?))`,
            [data.name, data.description, data.price, data.stock, data.category, data.sellerId, data.name]);

        data?.pictures?.forEach(async (url) => {
            await pool.execute(`INSERT INTO product_image (productId, url) VALUES (?, ?)`, [(result[0] as any).insertId, url]);
        });
    }

    static async findBySlug(slug: string) {
        const [rows] = await pool.execute(`
            select product.*, 
            CASE 
                WHEN COUNT(product_image.url) = 0 THEN JSON_ARRAY() 
                ELSE JSON_ARRAYAGG(product_image.url) 
            END AS pictures,
            seller.name as sellerName, seller.email as sellerEmail from product join seller on seller.id = sellerId left join product_image on product_image.productId = product.id where slug = ? group by product.id`, [slug]);
        return (rows as IProduct[])[0];
    }

    static async update(id: string, sellerId: number, data: { name: string, description: string, slug: string, price: number, stock: number, category: string, pictures: string[] }) {
        const fieldsToUpdate: string[] = [];
        const values: (string | any)[] = [];

        const fields = Object.keys(data);

        fields.forEach((key, i) => {
            if (key == 'pictures') return;
            fieldsToUpdate.push(`${key} = ?`);
            values.push(data[key as keyof typeof data]);
        });

        await pool.execute(`UPDATE product SET ${fieldsToUpdate.join(',')} WHERE id = ? and sellerId = ?`, [...values, id, sellerId]);
        if (data.pictures) {
            await pool.execute(`DELETE FROM product_image WHERE productId = ?`, [id]);
            data?.pictures.forEach(async (url) => {
                await pool.execute(`INSERT INTO product_image (productId, url) VALUES (?, ?)`, [id, url]);
            });
        }
    }

    static async deleteBySlug(slug: string, sellerId: number) {
        await pool.execute(`DELETE FROM product WHERE slug = ? and sellerId = ?`, [slug, sellerId]);
    }

    static async deleteById(id: string, sellerId: number) {
        await pool.execute(`DELETE FROM product WHERE id = ? and sellerId = ?`, [id, sellerId]);
    }

    static async findSellersProduct(sellerId: number, data: { keyword: string, category: string, sortby: string, order: string, page: string }) {
        const { keyword, category, sortby, order, page } = data;
        const limit = 20;
        const offset = (parseInt(page) || 1 - 1) * limit;
        const values: (string | number)[] = [];

        let orderBy = '', matchKeyword = '', categoryFilter = '';

        if (keyword && keyword?.trim()) {
            matchKeyword = `(name LIKE CONCAT('%', ?, '%') OR category LIKE CONCAT('%', ?, '%')) AND`;
            values.push(keyword, keyword);
        }

        if (category) {
            categoryFilter = `category = ? AND`;
            values.push(category);
        }

        if (sortby && order) {
            orderBy = `ORDER BY ${sortby} ${order === 'ASC' ? 'ASC' : 'DESC'}`;
        }
        values.push(sellerId);

        const countQuery = `SELECT COUNT(*) as totalCount FROM product
        WHERE ${matchKeyword} ${categoryFilter} sellerId = ?`;

        // const dataQuery = `SELECT product.id, name, price, stock, totalSold, MIN(pi.url) as picture FROM product
        const dataQuery = `SELECT product.id, name, price, stock, slug, MIN(pi.url) as picture FROM product
            LEFT JOIN product_image pi ON product.id = pi.productId
            WHERE ${matchKeyword} ${categoryFilter} sellerId = ?
            GROUP BY product.id
            ${orderBy}
            LIMIT ${limit}
            OFFSET ${offset}`;

        const [[{ totalCount }]]: any = await pool.execute(countQuery, values);
        const [rows] = await pool.execute(dataQuery, values);
        const totalPages = Math.ceil(totalCount / limit);

        console.log(rows)
        return {
            totalPages,
            totalCount,
            currentPage: parseInt(page) || 1,
            data: rows as IProduct[],
        };
    }

    
static async findProducts(data: { keyword: string, category: string, sortby: string, order: string, page: string }) {
    const { keyword, category, sortby, order, page } = data;
    const limit = 20;
    const offset = (parseInt(page) || 1 - 1) * limit;
    const values: (string | number)[] = [];

    let orderBy = '', matchKeyword = '', categoryFilter = '';

    if (keyword && keyword?.trim()) {
        matchKeyword = `(name LIKE CONCAT('%', ?, '%') OR category LIKE CONCAT('%', ?, '%'))`;
        values.push(keyword, keyword);
    }

    if (category) {
        categoryFilter = `category = ?`;
        values.push(category);
    }

    if (sortby && order) {
        orderBy = `ORDER BY ${sortby} ${order === 'ASC' ? 'ASC' : 'DESC'}`;
    }

    const countQuery = `SELECT COUNT(*) as totalCount FROM product
    ${matchKeyword || categoryFilter ? 'WHERE' : ""} ${matchKeyword} ${matchKeyword && categoryFilter ? 'AND' : ""} ${categoryFilter}`;

    // const dataQuery = `SELECT product.id, name, price, stock, totalSold, MIN(pi.url) as picture FROM product
    const dataQuery = `SELECT product.id, name, price, stock, slug, MIN(pi.url) as picture FROM product
        LEFT JOIN product_image pi ON product.id = pi.productId
        ${matchKeyword || categoryFilter ? 'WHERE' : ""} ${matchKeyword} ${matchKeyword && categoryFilter ? 'AND' : ""} ${categoryFilter}
        GROUP BY product.id
        ${orderBy}
        LIMIT ${limit}
        OFFSET ${offset}`;
    
        console.log(countQuery, '\n', dataQuery, '\n', values);

    const [[{ totalCount }]]: any = await pool.execute(countQuery, values);
    const [rows] = await pool.execute(dataQuery, values);
    const totalPages = Math.ceil(totalCount / limit);

    // console.log(rows)
    return {
        totalPages,
        totalCount,
        currentPage: parseInt(page) || 1,
        data: rows as IProduct[],
    };
}
}



export default Product;

// 'Charger', 1, 'name', 'ASC',  0
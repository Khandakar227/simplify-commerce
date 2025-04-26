import pool from '@/lib/conn';

export interface ICategory {
    id: number;
    name: string;
    createdAt: Date;
}

export class Category {
    static async getAll() {
        const [rows] = await pool.execute(`SELECT * FROM category`);
        return rows;
    }

    static async getById(id: number) {
        const [rows] = await pool.execute(`SELECT * FROM category WHERE id = ?`, [id]);
        return (rows as ICategory[])[0];
    }

    static async create(name: string) {
        await pool.execute(`INSERT INTO category (name) VALUES (?)`, [name]);
    }

    static async update(id: number, name: string) {
        await pool.execute(`UPDATE category SET name = ? WHERE id = ?`, [name, id]);
    }

    static async delete(id: number) {
        await pool.execute(`DELETE FROM category WHERE id = ?`, [id]);
    }
}
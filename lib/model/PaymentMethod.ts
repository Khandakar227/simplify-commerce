import pool from "../conn";

export interface IPaymentMethod {
    id: number;
    name: string;
    company: string;
    description: string;
    sellerId: number;
}

export class PaymentMethod {
    static async create (data: { name: string, company: string, description: string, sellerId: number }) {
        await pool.execute(`INSERT INTO payment_method (name, company, description, sellerId) VALUES (?, ?, ?, ?)`,
        [data.name, data.company, data.description, data.sellerId]);
    }

    static async findBySellerId (sellerId: number) {
        const [rows] = await pool.execute(`SELECT * FROM payment_method WHERE sellerId = ?`, [sellerId]);
        return (rows as IPaymentMethod[]);
    }

    static async deleteById (id: number) {
        await pool.execute(`DELETE FROM payment_method WHERE id = ?`, [id]);
    }
}
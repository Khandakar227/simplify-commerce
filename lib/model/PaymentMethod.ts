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

    static async update(id: number, sellerId: number, data: { name: string, company: string, description: string }) {
        const fieldsToUpdate: string[] = [];
        const values: (string | any)[] = [];
        
        const fields = Object.keys(data);

        fields.forEach((key, i) => {
            fieldsToUpdate.push(`${key} = ?`);
            values.push(data[key as keyof typeof data]);
        });
        
        await pool.execute(`UPDATE payment_method SET ${fieldsToUpdate.join(',')} WHERE id = ? and sellerId = ?`, [...values, id, sellerId]);
    }

    static async deleteById (id: number, sellerId: number) {
        await pool.execute(`DELETE FROM payment_method WHERE id = ? AND sellerId = ?`, [id, sellerId]);
    }
}
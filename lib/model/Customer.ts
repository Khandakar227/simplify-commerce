// lib/models/Customer.ts
import pool from '@/lib/conn';

interface ICustomer {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  isGuest: boolean;
  createdAt: Date;
}

class Customer {
    /**
     * Password must be hashed before calling this method.
     */
  static async create(data: { name?: string, password:string, email?: string, phone?: string, address?: string, isGuest?: boolean }) {
    const { name, email, phone, address, isGuest, password } = data;
    const [result]: any = await pool.execute(
      `INSERT INTO customer (name, email, password, phone, address, isGuest) VALUES (?, ?, ?, ?, ?)`,
      [name, email, password, phone, address, isGuest]
    );
    return result.insertId;
  }

  static async findByEmail(email: string) {
    const [rows]: any = await pool.execute(`SELECT * FROM customer WHERE email = ? AND password IS NOT NULL`, [email]);
    return rows[0] as ICustomer;
  }

  static async findById(id: number) {
    const [rows]: any = await pool.execute(`SELECT * FROM customer WHERE id = ?`, [id]);
    return rows[0] as ICustomer;
  }
}

export default Customer;

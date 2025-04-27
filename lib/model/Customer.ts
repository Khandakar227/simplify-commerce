// lib/models/Customer.ts
import pool from '@/lib/conn';

interface ICustomer {
  id: number;
  name?: string;
  email?: string;
  password?: string;
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
    // Check if email already exists
    const [existingUser]: any = await pool.execute(`SELECT * FROM customer WHERE email = ?`, [email]);
    // Check if the existing user is a guest
    if (existingUser.length > 0 && existingUser[0].isGuest) {
      // Update the existing guest user with the new data
      const [result]: any = await pool.execute(
        `UPDATE customer SET name = ?, password = ?, phone = ?, address = ?, isGuest = ? WHERE email = ?`,
        [name, password, phone, address, isGuest, email]
      );
      return result.affectedRows;
    } else if (existingUser.length > 0) {
      // If the email exists and is not a guest, return an error
      throw new Error('Email already exists and is not a guest account');
    }

    // If the email does not exist, create a new user
    const [result]: any = await pool.execute(
      `INSERT INTO customer (name, email, password, phone, address, isGuest) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email || null, password || null, phone || null, address || null, isGuest || null]
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

import pool from '@/lib/conn';

interface IBuyer {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  createdAt: Date;
}

class Buyer {
  static async create(data: { name: string; email: string; phone?: string; password: string; address?: string }) {
    await pool.execute(
      `INSERT INTO buyer (name, email, phone, password, address) VALUES (?, ?, ?, ?, ?)`,
      [data.name, data.email, data.phone, data.password, data.address]
    );
  }

  static createSignUp(data: { name: string; email: string; password: string }) {
    return pool.execute(
      `INSERT INTO buyer (name, email, password) VALUES (?, ?, ?)`,
      [data.name, data.email, data.password]
    );
  }

  static async findByEmail(where: { email: string }) {
    const [rows]: any = await pool.execute(`SELECT * FROM buyer WHERE email = ?`, [where.email]);
    return rows[0] as IBuyer;
  }

  static async updateByEmail(email: string, data: { name?: string; phone?: string; address?: string }) {
    const fieldsToUpdate: string[] = [];
    const values: (string | undefined)[] = [];

    const fields = Object.keys(data);

    fields.forEach((key) => {
      if (data[key as keyof typeof data] !== undefined) {
        fieldsToUpdate.push(`${key} = ?`);
        values.push(data[key as keyof typeof data]);
      }
    });

    return await pool.execute(
      `UPDATE buyer SET ${fieldsToUpdate.join(', ')} WHERE email = ?`,
      [...values, email]
    );
  }
}

export default Buyer;

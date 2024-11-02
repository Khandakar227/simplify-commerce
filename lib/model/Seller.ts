import pool from '@/lib/conn';

interface ISeller {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  taxInformation: string;
  shippingPolicies: string;
  returnPolicies: string;
  createdAt: Date;
}

class Seller {
  static async create (data: { name: string, email: string, phone?: string, password: string, taxInformation?: string, shippingPolicies?: string, returnPolicies?: string }) {
    await pool.execute(`INSERT INTO seller (name, email, phone, password, taxInformation, shippingPolicies, returnPolicies) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [data.name, data.email, data.phone, data.password, data.taxInformation, data.shippingPolicies, data.returnPolicies]);
  }

  static createSignUp (data: { name: string, email: string, password: string }) {
    return pool.execute(`INSERT INTO seller (name, email, password) VALUES (?, ?, ?)`,
      [data.name, data.email, data.password]);
  }

  static async findByEmail (where: { email: string }) {
    const [rows]:any = await pool.execute(`SELECT * FROM seller WHERE email = ?`, [where.email]);
    return rows[0] as ISeller;
  }

  static async updateByEmail (email: string, data: { name: string, phone: string, taxInformation: string, shippingPolicies: string, returnPolicies: string }) {
    const fieldsToUpdate: string[] = [];
    const values: (string | undefined)[] = [];
    
    const fields = Object.keys(data);

    fields.forEach((key, i) => {
      fieldsToUpdate.push(`${key} = ?`);
      values.push(data[key as keyof typeof data]);
    });
    
    return await pool.execute(`UPDATE seller SET ${fieldsToUpdate.join(',')} WHERE email = ?`,
      [...values, email]);
  }
}

export default Seller;
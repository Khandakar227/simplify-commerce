// lib/models/Order.ts
import pool from '@/lib/conn';

interface IOrder {
  id: number;
  customerId: number;
  sellerId: number;
  paymentMethodId: number;
  status: string;
  totalAmount: number;
  shippingAddress: string;
  placedAt: Date;
}

class Order {
  static async create(data: {
    customerId: number;
    sellerId: number;
    paymentMethodId: number;
    status?: string;
    totalAmount: number;
    shippingAddress: string;
  }) {
    const [result]: any = await pool.execute(
      `INSERT INTO \`order\` (customerId, sellerId, paymentMethodId, status, totalAmount, shippingAddress) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.customerId,
        data.sellerId,
        data.paymentMethodId,
        data.status ?? 'Pending',
        data.totalAmount,
        data.shippingAddress
      ]
    );
    return result.insertId;
  }

  static async findById(id: number) {
    const [rows]: any = await pool.execute(`SELECT * FROM \`order\` WHERE id = ?`, [id]);
    return rows[0] as IOrder;
  }

  static async updateStatus(id: number, status: string) {
    return await pool.execute(`UPDATE \`order\` SET status = ? WHERE id = ?`, [status, id]);
  }
}

export default Order;

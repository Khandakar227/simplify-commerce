// lib/models/Cart.ts
import pool from '@/lib/conn';

interface ICart {
  id: number;
  customerId: number;
  createdAt: Date;
}

class Cart {
  static async create(customerId: number) {
    const [result]: any = await pool.execute(
      `INSERT INTO cart (customerId) VALUES (?)`,
      [customerId]
    );
    return result.insertId;
  }

  static async getCartByCustomerId(customerId: number) {
    const [rows]: any = await pool.execute(`SELECT * FROM cart WHERE customerId = ?`, [customerId]);
    return rows[0] as ICart;
  }

  static async addItem(cartId: number, productId: number, quantity: number) {
    return await pool.execute(
      `INSERT INTO cart_item (cartId, productId, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?`,
      [cartId, productId, quantity, quantity]
    );
  }

  static async getItems(cartId: number) {
    const [rows]: any = await pool.execute(`
      SELECT ci.id, ci.quantity, p.name, p.price, p.stock 
      FROM cart_item ci
      JOIN product p ON ci.productId = p.id
      WHERE ci.cartId = ?`,
      [cartId]
    );
    return rows;
  }

  static async removeItem(cartItemId: number) {
    return await pool.execute(`DELETE FROM cart_item WHERE id = ?`, [cartItemId]);
  }

  static async clearCart(cartId: number) {
    return await pool.execute(`DELETE FROM cart_item WHERE cartId = ?`, [cartId]);
  }
}

export default Cart;

import pool from '@/lib/conn';

interface ICartItem {
  id: number;
  customerId: number;
  productId: number;
  quantity: number;
}

class Cart {
  static async addItem(data: {
    customerId: number;
    productId: number;
    quantity: number;
  }) {
    const [existingItem]: any = await pool.execute(
      `SELECT * FROM cart_item WHERE customerId = ? AND productId = ?`,
      [data.customerId, data.productId]
    );

    if (existingItem.length > 0) {
      // Update quantity if item already exists
      await pool.execute(
        `UPDATE cart_item SET quantity = quantity + ? WHERE id = ?`,
        [data.quantity, existingItem[0].id]
      );
      return existingItem[0].id; // Return cart item ID
    } else {
      // Insert new cart item
      const [result]: any = await pool.execute(
        `INSERT INTO cart_item (customerId, productId, quantity) VALUES (?, ?, ?)`,
        [data.customerId, data.productId, data.quantity]
      );
      return result.insertId;
    }
  }

  static async removeItem(cartItemId: number) {
    await pool.execute(`DELETE FROM cart_item WHERE id = ?`, [cartItemId]);
  }

  static async getItemsByCustomerId(customerId: number) {
    const [rows]: any = await pool.execute(
      `SELECT ci.*, pi.url as image, p.name FROM cart_item ci
      JOIN product p ON ci.productId = p.id
      LEFT JOIN product_image pi ON p.id = pi.productId
      WHERE ci.customerId = ?`,
      [customerId]
    );
    return rows as ICartItem[];
  }

  static async updateItemQuantity(cartItemId: number, quantity: number) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      await pool.execute(`DELETE FROM cart_item WHERE id = ?`, [cartItemId]);
    } else {
      await pool.execute(`UPDATE cart_item SET quantity = ? WHERE id = ?`, [
        quantity,
        cartItemId
      ]);
    }
  }

  static async clearCart(customerId: number) {
    await pool.execute(`DELETE FROM cart_item WHERE customerId = ?`, [customerId]);
  }
}

export default Cart;

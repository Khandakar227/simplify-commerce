import pool from '@/lib/conn';

interface IOrder {
  id: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethodId: number;
  status: string;
  totalAmount: number;
  shippingAddress: string;
  placedAt: Date;
}

interface IOrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
}

interface IOrderWithItems extends IOrder {
  ordered_items: IOrderItem[];
}

class Order {
  static async create(data: {
    customerId?: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    paymentMethodId: number;
    shippingAddress: string;
    items: { productId: number; quantity: number; unitPrice: number; }[]; // ✅ Add items
  }) {
    const conn = await pool.getConnection(); // Start a connection
    try {
      await conn.beginTransaction(); // ✅ Start a transaction

      const productIds = data.items.map(item => item.productId);
      const [productRows]: any = await conn.query(
        `SELECT id, price FROM product WHERE id IN (?)`,
        [productIds]
      );
  
      // Create a map of productId -> price
      const productPriceMap: Record<number, number> = {};
      for (const row of productRows) {
        productPriceMap[row.id] = row.price;
      }
      // Check if all productIds are valid
      let totalAmount = 0;
      const itemInserts = data.items.map(item => {
        const unitPrice = productPriceMap[item.productId];
        if (unitPrice === undefined) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
        if (item.quantity <= 0) throw new Error(`Invalid quantity for product ID ${item.productId}`);
      
        totalAmount += unitPrice * item.quantity;
        return [
          item.productId,
          item.quantity,
          unitPrice
        ];
      });
      // Insert into `order` table
      const [orderResult]: any = await conn.execute(
        `INSERT INTO \`order\` (customerId, customerName, customerEmail, customerPhone, paymentMethodId, status, totalAmount, shippingAddress, placedAt) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          data.customerId || null,
          data.customerName,
          data.customerEmail,
          data.customerPhone,
          data.paymentMethodId,
          'Pending',
          data.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0), // Calculate total amount
          data.shippingAddress
        ]
      );
  
      const orderId = orderResult.insertId;

      // Insert into `order_item`
      const finalItemInserts = itemInserts.map(item => [orderId, ...item]); // attach orderId
      await conn.query(
        `INSERT INTO \`order_item\` (orderId, productId, quantity, unitPrice) VALUES ?`,
        [finalItemInserts]
      );  

      await conn.commit(); // ✅ Commit transaction
      return orderId;
    } catch (error) {
      await conn.rollback(); // ❌ Rollback if error
      throw error;
    } finally {
      conn.release(); // Always release connection
    }
  }
  
  static async findById(id: number) {

    const [rows]: any = await pool.execute(`
    select o.*, JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', oi.id,
        'name', p.name,
        'image', pi.url,
        'productId', oi.productId,
        'quantity', oi.quantity,
        'unitPrice', oi.unitPrice
    )) as ordered_items
    from \`order\` o
    join order_item oi on o.id = oi.orderId
    join product p on p.id = oi.productId
    LEFT JOIN product_image pi ON p.id = pi.productId
    where o.id = ?
    GROUP BY o.id
    `, [id]);
    return rows[0] as IOrderWithItems;
  }

  static async updateStatus(id: number, status: string) {
    return await pool.execute(`UPDATE \`order\` SET status = ? WHERE id = ?`, [status, id]);
  }
}

export default Order;

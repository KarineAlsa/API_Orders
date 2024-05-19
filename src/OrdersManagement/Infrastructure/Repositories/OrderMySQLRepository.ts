import { Order } from "../../Domain/Entity/Order";
import OrderInterface  from "../../Domain/Ports/OrderInterface";
import query from "../../../Database/mysql";


export default class UserMysqlRepository implements OrderInterface {
  async changeStatus(id: any, status: string): Promise<any> {
    let updateQuery = "UPDATE Orders SET Estatus = ? WHERE id = ?";
    const params: any[] = [status,id];
    try {
      const [result]: any = await query(updateQuery, params);

      if (result && result.affectedRows > 0) {
        const order = await this.getOrderById(id);
        return order
      } else {
        throw new Error("No se pudo actualizar la orden");
      }
    } catch (error) {
      throw new Error(`Error en la operación de actualización`);
    }
  }
  async createOrder(order: Order): Promise<any> {
    const sql = "INSERT INTO Orders (Total, Fecha, Estatus) VALUES (?,?,?)";
    const params: any[] = [order.Total, order.Fecha,order.Estatus];
    try {
      const [result]: any = await query(sql, params);
      

    if (result) {

      return {
        id: result.insertId, 
        Total : order.Total,
        Fecha : order.Fecha,
        Estatus : order.Estatus
      }

    } else {
      throw new Error("Error al insertar la orden en la base de datos");
    }
    }
    catch (error) {
    throw new Error(`Error en la operación de guardado`);
    }
  }  

  async listAll(): Promise<any> {
    const sql = "SELECT * FROM Orders";
    const params: any[] = [];
    try {
      const [result]: any = await query(sql, params);
      
      if (result){
        return result
      }
      else {
        return "No hay ordenes en la base de datos";
      }
    }
    catch (error) {
      return "ocurrió un error";
    }
  }

  async getOrderById(id: any): Promise<any> {
    const sql = "SELECT * FROM Orders WHERE id = ?";
    const params: any[] = [id];
    try {
      const [[result]]: any = await query(sql, params);
      if (result){
        return result
      }
      else {
        return false;
      }
    }
    catch (error) {
      return false;
    }
  }
  async getQuantity(id: any): Promise<any> {
    const sql = `
    SELECT 
        o.id,
        op.product_id,
        SUM(op.cantidad) AS total_quantity
    FROM 
        Orders o
    JOIN 
        Orders_Products op ON o.id = op.order_id
    WHERE 
        o.id = ?
    GROUP BY 
        o.id, 
        op.product_id
    ORDER BY 
        o.id, 
        op.product_id;
`;
    const params: any[] = [id];
    try {
      const [result]: any = await query(sql, params);
      if (result){
        return result
      }
      else {
        return false;
      }
    }
    catch (error) {
      return false;
    }
  }
    
}
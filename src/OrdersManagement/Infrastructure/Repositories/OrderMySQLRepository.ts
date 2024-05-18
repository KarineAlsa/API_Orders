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
        return true
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




    
}
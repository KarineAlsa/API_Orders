import { Order } from "../../Domain/Entity/Order";
import  OrderInterface  from "../../Domain/Ports/OrderInterface";

export default class RegisterUserUseCase {

    constructor(readonly repository:OrderInterface) {}

    async run( { Total, Fecha, Estatus}: {
        Total: number;
        Fecha: string; 
        Estatus: string;
      } ):Promise<Order|any> {
        try {

            let user = new Order(
                Total,
                Fecha,
                Estatus
                
            );
            return await this.repository.createOrder(user);
        }catch(error) {

        }
    }

}
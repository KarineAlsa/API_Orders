import { Order } from "../../Domain/Entity/Order";
import  OrderInterface  from "../../Domain/Ports/OrderInterface";

export default class RegisterStudentUseCase {

    constructor(readonly repository:OrderInterface) {}

    async run():Promise<Order|any> {
        try {

            return await this.repository.listAll();
        }catch(error) {

        }
    }

}
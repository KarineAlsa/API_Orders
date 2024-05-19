import  OrderInterface  from "../../Domain/Ports/OrderInterface";
import { RabbitMQService } from "../Services/rabbit";

export default class ChangeTrackingUseCase {

    constructor(readonly repository:OrderInterface, readonly rabbit:RabbitMQService) {}

    async run( id:number,status:string ):Promise<any> {
        try {
          
            let orderChanged= await this.repository.changeStatus(id,status);
            if (orderChanged.Estatus=="Enviado"){
                await this.rabbit.connect();
                let orderProducts = await this.repository.getQuantity(orderChanged.id)
                console.log(orderProducts)
                await this.rabbit.publishMessage('order_sent',orderProducts);
        
            }
            return orderChanged;
        }catch(error) {

        }
    }

   

}
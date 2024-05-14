import  OrderInterface  from "../../Domain/Ports/OrderInterface";

export default class ChangeTrackingUseCase {

    constructor(readonly repository:OrderInterface) {}

    async run( id:number,status:string ):Promise<any> {
        try {
          
            return await this.repository.changeStatus(id,status);
        }catch(error) {

        }
    }

}
import {Order} from "../Entity/Order";

export default interface OrderInterface{
    createOrder(order:Order):Promise<Order|any>;
    listAll():Promise<Order[]|any>;
    changeStatus(id:any, status:string):Promise<Order|any>;
    getQuantity(id:any):Promise<number|any>;
}
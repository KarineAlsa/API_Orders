import { Request, Response } from "express";
import  ListAllOrdersUseCase  from "../../Application/UseCase/ListAllOrdersUseCase";

export default class RegisterController {

    constructor(readonly useCase:ListAllOrdersUseCase){}

    async run(request:Request,response:Response) {

        try {
            
            let orders = await this.useCase.run();
            if (orders) {
                return response.status(200).json({data:orders,message:"Ordenes obtenidas",success:true});
            } else {
                response.status(400).send({
                    
                    message: "No se pudo obtener todas las ordenes",
                    success: false,
                });
            }
        } catch (error:any) {
            console.log(error)
            response.status(500).send({
                
                message: "Ha ocurrido un error durante su petición.",
                success:false
            });
        }
    }
    }
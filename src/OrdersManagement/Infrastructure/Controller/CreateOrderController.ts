import { Request, Response } from "express";
import  CreateOrderUseCase  from "../../Application/UseCase/CreateOrderUseCase";


export default class CreateOrderController {

    constructor(readonly useCase:CreateOrderUseCase){}

    async run(request:Request,response:Response) {
        //La fecha de nacimiento tiene que ir en formato YYYY-MM-DD
        const { Total, Estatus } = request.body;
        
        if (!Total  || !Estatus) {
            return response.status(400).json({
                message: "Debe completar todos los campos.",
                success: false
            });
        }
        if (isNaN(Total) || Total < 0 ) {
            return response.status(400).json({
                message: "Los campos no pueden estar vacíos.",
                success: false
            });
        }
        try {
            const createdAt = new Date().toISOString().slice(0, 10);
            
            let order = await this.useCase.run({
                Total: Total,
                Fecha: createdAt,
                Estatus: Estatus,
            });
            if (order) {
                return response.status(200).json({data:order,message:"Orden creada",success:true});
            } else {
                response.status(400).send({
                    
                    message: "No se pudo crear la orden",
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
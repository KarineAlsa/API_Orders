import { Request, Response } from "express";
import  ChangeTrackingUseCase  from "../../Application/UseCase/ChangeTrackingUseCase";


export default class ChangeTrackingController {

    constructor(readonly useCase:ChangeTrackingUseCase){}

    async run(request:Request,response:Response) {
        const { Estatus } = request.body;
        const { id } = request.params;
        
        if (!Estatus || !id) {
            return response.status(400).json({
                message: "Debe completar todos los campos.",
                success: false
            });
        }
        
        try {
            
            let orderChanged = await this.useCase.run(Number(id),Estatus);
            if (orderChanged) {
                
                return response.status(200).json({data:orderChanged,message:"Pedido actualizado",success:true});
            } else {
                response.status(400).send({
                    
                    message: "No se pudo cambiar el estado del pedido",
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
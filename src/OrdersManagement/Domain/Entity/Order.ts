export class Order {

    public Total:number;
    public Fecha:string;
    public Estatus:string;
    public id?:number

    constructor(
        Total:number,
        Fecha:string,
        Estatus:string,
        id?:number
    ) {
        this.Total = Total;
        this.Fecha = Fecha;
        this.Estatus = Estatus;
        this.id = id;
    }

    public getId(){
        return this.id;
    }
   

}
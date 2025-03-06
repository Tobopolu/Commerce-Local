import { Event } from "./event";
import { Product } from "./product";

export interface Shop{
    id_shop:number,
    id_user:number,
    id_shoprequest:number,
    name:string,
    description:string,
    address:string,
    phone:string,
    siret:string,
    logo:string,
    image:string,
    legalproof:string,
    id_status:number,
    products:Product[],
    events:Event[],
    promos:Product[],
}

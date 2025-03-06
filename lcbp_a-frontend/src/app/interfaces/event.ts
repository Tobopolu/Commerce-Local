export interface Event {
    id_event:number,
    id_shop:number,
    name:string,
    description:string,
    address:string,
    date:string,
    price:number,
    images:string,
    shop_name:string,
    selectedImage?: File,
}

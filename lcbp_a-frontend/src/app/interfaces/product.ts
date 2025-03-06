export interface Product {
    id_product:number,
    id_shop:number,
    name:string,
    description:string,
    price:number,
    stock:number,
    images:string,
    // category:string,
    promo:number,
    selectedImage?: File,
}

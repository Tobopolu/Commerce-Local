import db from "../configs/db.config.js";


export async function getById(id) {

    const sql = "SELECT * FROM products WHERE id_product = :id";
    const [result] = await db.promise().execute(sql, {id});
    return result[0];
}

export async function getByShop(id) {

    const sql = "SELECT * FROM products WHERE id_shop = :id";
    const [result] = await db.promise().execute(sql, {id});
    return result[0];
}

export async function getAll() {
    const sql = "SELECT * FROM products";
    const [result] = await db.promise().execute(sql);
    return result;
}

export async function getAllPromos() {
    const sql = "SELECT * FROM products where promo is not NULL and promo != 0";
    const [result] = await db.promise().execute(sql);
    return result;
}

export async function createProduct(objData) {
    const sql = "INSERT INTO products (name, description, price, stock, images, promo, id_shop) VALUES (:name, :description, :price, :stock, :images, :promo, :id_shop)";
    const [result] = await db.promise().execute(sql,objData);
    return {insertId: result.insertId}; 
}

export async function updateProduct(objData) {
    const sql = "UPDATE products SET name = :name, description = :description, price = :price, stock = :stock, images = :images, promo = :promo WHERE id_product = :id";
    const [result] = await db.promise().execute(sql, objData);  
    return { affectedRows : result.affectedRows };
}

export async function deleteProduct(id) {
    const sql = "DELETE FROM products WHERE id_product = :id";
    const [result] = await db.promise().execute(sql, {id});  
    return { affectedRows: result.affectedRows };
}

export async function getProductsByShopId(id_shop) {
    const sql = "SELECT * FROM products WHERE id_shop = :id_shop";
    const [result] = await db.promise().execute(sql, { id_shop });
    return result;
}
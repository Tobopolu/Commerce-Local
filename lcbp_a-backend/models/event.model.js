import db from "../configs/db.config.js";


export async function getById(id) {

    const sql = "SELECT * FROM events WHERE id_event = :id";
    const [result] = await db.promise().execute(sql, {id});
    return result[0];
}

export async function getByShop(id) {

    const sql = "SELECT * FROM events WHERE id_shop = :id";
    const [result] = await db.promise().execute(sql, {id});
    return result[0];
}

export async function getAll() {
    const sql = "SELECT e.*,s.name AS shop_name FROM events e JOIN shops s ON e.id_shop = s.id_shop";
    const [result] = await db.promise().execute(sql);
    return result;
}

export async function getAllByShop(id) {
    const sql = "SELECT e.*,s.name AS shop_name FROM events e JOIN shops s ON e.id_shop = s.id_shop where s.id_shop = :id";
    const [result] = await db.promise().execute(sql,{id});
    return result;
}

export async function deleteEvent(id) {
    const sql = "DELETE FROM events WHERE id_event = :id";
    const [result] = await db.promise().execute(sql, {id});  
    return { affectedRows: result.affectedRows };
}

export async function createEvent(objData) {
    const sql = "INSERT INTO events (name, description, price, address, images, date, id_shop) VALUES (:name, :description, :price, :address, :images, :date, :id_shop)";
    const [result] = await db.promise().execute(sql,objData);
    return {insertId: result.insertId}; 
}

export async function updateEvent(objData) {
    const sql = "UPDATE events SET name = :name, description = :description, price = :price, address = :address, images = :images, date = :date WHERE id_event = :id";
    const [result] = await db.promise().execute(sql, objData);  
    return { affectedRows : result.affectedRows };
}

// export async function getIdByName(name) {
//     const sql = "select id_shop from shops where name = :name";
//     const [result] = await db.promise().execute(sql,{name});
//     return result;
// }

// export async function getNameByID(id) {
//     const sql = "select name from shops where id_shop = :id";
//     const [result] = await db.promise().execute(sql,{id});
//     return result;
// }

// export async function getIdByCategory(name) {
//     const sql = "select s.id_shop from shops s join shops_categories sc on sc.id_shop = s.id_shop join categories c on c.id_category = sc.id_category where c.name = :name";
//     const [result] = await db.promise().execute(sql,{name});
//     return result;
// }

// export async function createShop(shop) {
//     const sql = "INSERT INTO shops (name, description, adress, images, id_user) VALUES (:name, :description, :adress, :images, :id_user)";
//     const [result] = await db.promise().execute(sql,shop);  
//     return {insertId: result.insertId}; 
// }

// export async function createShop(objData) {
//     const sql = "INSERT INTO shops (name, siret, address, phone, description, image, logo, legalproof, id_user) VALUES (:name, :siret, :address, :phone, :description, :image, :logo, :legalproof, :id_user)";
//     const [result] = await db.promise().execute(sql,objData);  
//     return {insertId: result.insertId}; 
// }

// export async function updateShop(objData) {
//     console.log(objData);
//     const sql = "UPDATE shops SET name = :name, description = :description, address = :address, image = :image, id_user = :id_user WHERE id_shop = :id";
//     const [result] = await db.promise().execute(sql, objData);  
//     return {insertId: result.insertId};
// }

// export async function deleteShop(id) {
//     const sql = "DELETE FROM shops WHERE id_shop = :id";
//     const [result] = await db.promise().execute(sql, {id});  
//     return { affectedRows: result.affectedRows };
// }


// export async function updateRequeState(objData) {
//     console.log('request');
//     console.log(objData);
    
//     const sql = "UPDATE shops SET id_shoprequest = :state WHERE id_shop = :sid";
//     const [result] = await db.promise().execute(sql, objData);  
//     return {insertId: result.insertId};
// }

// export async function updateState(objData) {
//     console.log('state');
//     console.log(objData);
//     const sql = "UPDATE shops SET id_status = :status WHERE id_shop = :sid";
//     const [result] = await db.promise().execute(sql, objData);  
//     return {insertId: result.insertId};
// }

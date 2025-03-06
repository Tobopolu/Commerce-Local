import db from "../configs/db.config.js";

export async function getUserByID(id) {
    const sql = "select * from users where id_user = :id";
    const [result] = await db.promise().execute(sql,{id});
    return result;
}

export async function getIdByEmail(em) {
    const sql = "select id_user from users where email = :em";
    const [result] = await db.promise().execute(sql,{em});
    return result;
}

export async function getPswdByID(id) {
    const sql = "select password from users where id_user = :id";
    const [result] = await db.promise().execute(sql,{id});
    return result;
}

export async function createUser(user) {
    const sql = "INSERT INTO users (firstname, lastname, email, password, phone) VALUES (:fn, :ln, :em, :pd, :ph)";
    const [result] = await db.promise().execute(sql,user);  
    console.log("I was created : "+user);
    const sql2 = "INSERT INTO roles_users (id_user) VALUES (:id)";
    await db.promise().execute(sql2,{id: result.insertId})
    
    return {insertId: result.insertId}; 
}

export async function updateUser(objData) {
    console.log(objData);
    
    const sql = "UPDATE users SET firstname = :fn, lastname = :ln, email= :em, password = :pd, phone = :ph WHERE id_user = :idu";
    const [result] = await db.promise().execute(sql, objData);  
    return {insertId: result.insertId};
}

export async function updateRole(objData) {
    console.log(objData);
    
    const sql = "UPDATE roles_users SET id_role = :ir WHERE id_user = :idu";
    const [result] = await db.promise().execute(sql, objData);  
    return {insertId: result.insertId};
}

export async function deleteUser(id) {
    console.log(id);
    
    const sql = "DELETE FROM users WHERE id_user = :id";
    console.log(sql);
    
    const [result] = await db.promise().execute(sql, {id});  
    return { affectedRows: result.affectedRows };
}

export async function getRoleByID(id) {
    const sql = "select r.name from roles r join roles_users ru on ru.id_role = r.id_role join users u on u.id_user = ru.id_user where u.id_user = :id";
    const [result] = await db.promise().execute(sql,{id});
    return result;
}


export async function getAllUserData() {
    const sql = "SELECT u.id_user, u.firstname, u.lastname, u.email, u.phone, s.id_shop, s.name AS shop_name, s.description AS shop_description, s.address AS shop_address, s.image AS shop_image, s.phone AS shop_phone, s.siret, s.legalproof, s.logo, s.id_shoprequest, s.id_status, m_sent.id_message AS sent_message_id, m_sent.id_recipient AS sent_recipient, m_sent.title AS sent_title, m_sent.message AS sent_message, m_sent.date AS sent_date, m_received.id_message AS received_message_id, m_received.id_sender AS received_sender, m_received.title AS received_title, m_received.message AS received_message, m_received.date AS received_date, o.id_order, o.state, c.id_comment, c.id_product AS comment_product, c.message AS comment_message, c.date AS comment_date, c.note AS comment_note, p.name AS comment_product_name FROM users u LEFT JOIN shops s ON u.id_user = s.id_user LEFT JOIN messages m_sent ON u.id_user = m_sent.id_sender LEFT JOIN messages m_received ON u.id_user = m_received.id_recipient LEFT JOIN orders o ON u.id_user = o.id_user LEFT JOIN comments c ON u.id_user = c.id_user LEFT JOIN products p ON c.id_product = p.id_product;";
    const [result] = await db.promise().execute(sql);
    return result;
}
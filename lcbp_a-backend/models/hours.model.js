
import db from "../configs/db.config.js";


export async function getAllHours() {
    const sql = "SELECT * FROM hours";
    const [result] = await db.promise().execute(sql);
    return result;
}

export async function getHourId(id) {
    const sql = "SELECT * FROM hours WHERE id_hour = ?";
    const [result] = await db.promise().execute(sql, [id]);
    return result[0]; 
}
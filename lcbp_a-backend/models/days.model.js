
import db from "../configs/db.config.js";


export async function getAllDays() {
    const sql = "SELECT * FROM days";
    const [result] = await db.promise().execute(sql);
    return result;
}

export async function getDayId(id) {
    const sql = "SELECT * FROM days WHERE id_day = ?";
    const [result] = await db.promise().execute(sql, [id]);
    return result[0]; 
}
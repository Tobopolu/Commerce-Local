
import db from "../configs/db.config.js";


export async function getAllStates() {
    const sql = "SELECT * FROM states";
    const [result] = await db.promise().execute(sql);
    return result;
}

export async function getStateId(id) {
    const sql = "SELECT * FROM states WHERE id_state = ?";
    const [result] = await db.promise().execute(sql, [id]);
    return result[0]; 
}
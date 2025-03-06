import db from "../configs/db.config.js";


export async function getAllSchedules() {
    console.log("GETALLSCHEDULE");
    const sql = "SELECT * FROM schedules";
    const [result] = await db.promise().execute(sql);
    return result;
}

export async function createSchedule(id_day, id_hour, id_state) {
    console.log("CREATESCHEDULE");
    
    const sql = "INSERT INTO schedules (id_day, id_hour, id_state) VALUES (?, ?, ?)";
    const [result] = await db.promise().execute(sql, [id_day, id_hour, id_state]);
    return result.insertId;
}

export async function associateShopToSchedule(shopId, scheduleId) {
    console.log("ASSOCIATEshopTOSCHEDULE",shopId,scheduleId);
    
    const sql = "INSERT INTO shops_schedules (id_shop, id_schedule) VALUES (?, ?)";
    await db.promise().execute(sql, [shopId, scheduleId]);
}

export async function getSchedulesByShopId(id_shop) {
    const sql = `
                SELECT s.id_day, h.hour AS time, s.id_state
                FROM shops_schedules ss
                JOIN schedules s ON ss.id_schedule = s.id_schedule
                JOIN hours h ON s.id_hour = h.id_hour
                WHERE ss.id_shop = :id_shop
                ORDER BY s.id_day, h.hour
                `;
    const [result] = await db.promise().execute(sql, { id_shop });
    return result;
}

export async function updateSchedule(objData) {
    const sql = "UPDATE schedules SET id_day = :id_day, id_hour = :id_hour, id_state = :id_state WHERE id_schedule = :id";
    const [result] = await db.promise().execute(sql, objData);  
    return { affectedRows : result.affectedRows };
}



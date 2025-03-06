
import db from "../configs/db.config.js";

// Récupérer l'ID d'une catégorie par son nom
export async function getCategoryIdByName(name) {
    const sql = "SELECT id_category FROM categories WHERE name = :name";
    const [result] = await db.promise().execute(sql, { name });
    return result;
}

// Récupérer toutes les catégories
export async function getAllCategories() {
    const sql = "SELECT * FROM categories";
    const [result] = await db.promise().execute(sql);
    return result;
}

// Créer une nouvelle catégorie
export async function createCategory(name) {
    const sql = "INSERT INTO categories (name) VALUES (:name)";
    const [result] = await db.promise().execute(sql, { name });
    return result.insertId; // Retourne l'ID de la nouvelle catégorie
}

// Associer une boutique à une catégorie
export async function associateShopToCategory(shopId, categoryId) {
    const sql = 'INSERT INTO shops_categories (id_shop, id_category) VALUES (?, ?)';
    await db.promise().execute(sql, [shopId, categoryId]);
}

import { pool } from './database.js';

class librosController{
    async getAll (req, res){
        const [result] = await pool.query('SELECT * FROM Libros')
        res.json(result);
    } 

    async add (req, res){
        const libros=req.body;
        const [result] = await pool.query(`INSERT INTO libros ( Nombre, Autor, Categoria ,año,ISBN) VALUES (?, ?, ?,?,?)`,
         [libros.Nombre, libros.Autor,libros.categoria, libros.año, libros.ISBN]);
        res.json({"Id insertado": result.insertId});
    }
}

export const libros = new librosController();
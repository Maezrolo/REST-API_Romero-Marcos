import { pool  } from './database.js';

class PersonaController{
    async getAll (req, res){
        const [result] = await pool.query('SELECT * FROM personas')
        res.json(result);
    } 

    async add (req, res){
        const personas=req.body;
        const [result] = await pool.query(`INSERT INTO personas ( nombre, apellido, dni) VALUES (?, ?, ?)`, [personas.nombre, personas.apellido, personas.dni]);
        res.json({"Id insertado": result.insertId});
    }
}

export const personas = new PersonaController();
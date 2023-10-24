import {pool} from './database.js';
class LibrosController{

    //ver todos los libros
    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    //buscar un libro por id
    async getOne(req, res) {
        try{
                const libro = req.body;
                const id_libro = parseInt(libro.id_libros);
                const [result] = await pool.query(`select * from libros where id_libros=?`, [id_libro]);
                if (result[0]!=undefined){
                    res.json(result);
                }else{
                    res.json({"Error": "No se ha encontrado un libro con la Id especificada"});
                }
            }catch(e) {
                console.log(e);
        }
    }

    //agregar un libro
    async add (req, res){
        const libros=req.body;
        const [result] = await pool.query(`INSERT INTO libros ( Nombre, Autor, Categoria ,año,ISBN) VALUES (?, ?, ?,?,?)`,
        [libros.Nombre, libros.Autor,libros.Categoria, libros.año, libros.ISBN]);
        res.json({"Id insertado": result.insertId});
    }
    
    async update(req, res) {
        try{
                const libro = req.body;
                const id_libro = parseInt(libro.ISBN);
                const [result] = await pool.query(`select * from libros where ISBN=?`, [id_libro]);
                if (result.length === 1) {
                    const updateResult = await pool.query(`UPDATE libros SET Nombre = ?, Autor = ?, Categoria = ?, año = ?, ISBN = ? WHERE id_libro = ?`,
                    [
                        libro.Nombre,
                        libro.Autor,
                        libro.Categoria,
                        libro.año,
                        libro.ISBN,
                        id_libro
                    ]
                );
                if (updateResult.affectedRows === 1) {
                    // El libro se actualizó con éxito.
                    res.json({ message: 'Libro actualizado con éxito' });
                } else {
                    // No se pudo actualizar el libro.
                    res.status(500).json({ error: 'Error al actualizar el libro' });
                }
                }else{
                    res.json({"Error": "No se ha encontrado un libro con la Id especificada"});
                }
            }catch(e) {
                console.log(e);
        }
    }
    
}

export const libro = new LibrosController();
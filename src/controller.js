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
                const id_libro = parseInt(libro.id);
                const [result] = await pool.query(`select * from libros where id_libros=?`, [id_libro]);
                if (result[0]!=undefined){
                    res.json(result);
                }else{
                    res.status(500).json({"Error": "No se ha encontrado un libro con la Id especificada"});
                }
            }catch(e) {
                console.log(e);
        }
    }

    //agregar un libro
    async add(req, res) {
        try {
            const libros = req.body;
            if (!libros.Nombre || !libros.Autor || !libros.Categoria || !libros.año || !libros.ISBN) {
                return res.status(400).json({ error: 'Todos los campos deben completarse' });
            }
    
            const [result] = await pool.query(
                `INSERT INTO libros (Nombre, Autor, Categoria, año, ISBN) VALUES (?, ?, ?, ?, ?)`,
                [libros.Nombre, libros.Autor, libros.Categoria, libros.año, libros.ISBN]
            );
    
            return res.status(200).json({ Libro: 'Libro ingresado con éxito', IDLibro: result.insertId });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error al ingresar el libro' });
        }
    }

    //actualizar un libro
    async update(req, res){
        try {
            const libro = req.body;
            const [result] = await pool.query(`UPDATE libros SET Nombre=(?), Autor=(?), Categoria=(?), año=(?), ISBN=(?) WHERE id_libros=(?)`,[libro.Nombre, libro.Autor, libro.Categoria, libro.año, libro.ISBN, libro.id]);
            if (result.changedRows === 0) {
                throw new Error('No se encontró un libro con el ID proporcionado o los datos proporcionados ya existen.');
            }
            res.status(200).json({"Registros Actualizados": result.changedRows});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al actualizar el libro, compruebe los campos requeridos.' });
        }
}
    //eliminar un liber por isbn
    
}

export const libro = new LibrosController();
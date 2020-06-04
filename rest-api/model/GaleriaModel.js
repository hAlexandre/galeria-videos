const db = require('../banco/dbConnect');

module.exports = class GaleriaModel{

    static getAll(callback){
        return db.query("SELECT * FROM galeria_video", callback);
    }

    static getVideoById(id, callback){
        return db.query("SELECT * FROM galeria_video WHERE id_galeria_video = ?", [id], callback);
    }

    static addVideo(dados, callback){
        console.log("addVideo sendo chamado ");
        return db.query("INSERT INTO galeria_video (titulo, caminho) VALUES (?, ?)", 
        [dados.titulo, dados.caminho], callback);
    }

}

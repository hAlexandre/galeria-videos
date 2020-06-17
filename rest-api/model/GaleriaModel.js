const db = require('../banco/dbConnect');

module.exports = class GaleriaModel{

    static getAll(callback){
        console.log("OI");
        return db.query("SELECT * FROM galeria_video", callback);
    }

    static getVideoById(id, callback){
        return db.query("SELECT * FROM galeria_video WHERE id_galeria_video = ?", [id], callback);
    }

    static addVideo(dados, callback){
        return db.query("INSERT INTO galeria_video (titulo, caminho) VALUES (?, ?)", 
        [dados.titulo, dados.caminho], callback);
    }

    static deleteVideo(id, callback){
        console.log("OI -> ")
        return db.query("DELETE FROM galeria_video WHERE id_galeria_video = ?",
        [id], callback);
    }

    static editVideo(dados, callback){
        
        if(dados.caminho != null){
            return db.query("UPDATE galeria_video set titulo = ? , caminho = ?  WHERE id_galeria_video = ?", 
            [dados.titulo, dados.caminho, dados.id_galeria_video], callback);
        } else {
            return db.query("UPDATE galeria_video set titulo = ? WHERE id_galeria_video = ?", 
            [dados.titulo, dados.id_galeria_video], callback);
        }

        
    }

}

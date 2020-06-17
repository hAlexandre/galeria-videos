const express = require('express');
const router = express.Router();

const GaleriaModel = require('../model/GaleriaModel');
const RespostaClass = require('../model/RespostaClass');

let fs = require ('fs');


router.get("/", function(req, resp, next){
    GaleriaModel.getAll(function(error, retorno){
        let resposta = new RespostaClass();
        console.log("CHAMOU");
        if(error){
            resposta.error = true;
            resposta.msg = "Ocorreu um erro";
            console.log("erro = ", error)
        }else{
            resposta.dados = retorno;
        }
        console.log("HUUH");
        //console.log(resposta);
        resp.json(resposta);
    });
});

router.get("/:id?", function(req, resp, next){
    GaleriaModel.getVideoById(req.params.id, function(error, retorno){
        let resposta = new RespostaClass();

        if(error){
            resposta.error = true;
            resposta.msg = "Ocorreu um erro";
            console.log("erro = ", error)
        }else{
            resposta.dados = retorno;
        }

        resp.json(resposta);
    });
});




let publicFolder = './public/files/';
let multer = require('multer');
let path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, publicFolder)
    },
    filename: function (req, file, cb) {
      let filename = `${file.fieldname.replace(/\//g,'')}-${Date.now()}${path.extname(file.originalname)};`
      filename = filename.replace(";","");
      req.body.caminho = publicFolder+filename;
      cb(null, filename)
      console.log("filename ",filename);
    }
  })

var upload = multer({storage: storage});
   

router.post("/", upload.single('file'),  function(req, resp, next){
    let resposta = new RespostaClass();
    console.log("req file -> ");
    if(req.file != null){
        console.log("AAA >> ",req.body);
        GaleriaModel.addVideo(req.body, function(error, retorno){
        
        if(error){
            resposta.error = true;
            resposta.msg = "Ocorreu um erro";
            console.log("erro = ", error);
            deleteFile(req.caminho);
        }else{
            if(retorno.affectedRows > 0 ) {
                resposta.msg = "Inserção realizada com sucesso";
            } else {
                resposta.error = true;
                resposta.msg = "Não foi possível inserir o vídeo";
                deleteFile(req.caminho);
            }            
        }
        console.log('resp',resposta);
        resp.json(resposta);
    })}
    else{
            resposta.error = true;
            resposta.msg = "Não foi enviado um arquivo";
            console.log("erro: ", error);
            req.push;
        }
});

function deleteFile(caminho) {
    if(caminho != null) {
        fs.unlinkSync(caminho);
        console.log("File was deleted");
    }
}

router.put("/", upload.single('file'),  function(req, resp, next){
    let resposta = new RespostaClass();
    
    GaleriaModel.editVideo(req.body, function(error, retorno){
    
    if(error){
        resposta.error = true;
        resposta.msg = "Ocorreu um erro";
        console.log("erro = ", error);
        deleteFile(req.caminho);
    }else{
        if(retorno.affectedRows > 0 ) {
            resposta.msg = "Alteração realizada com sucesso";
        } else {
            resposta.error = true;
            resposta.msg = "Não foi possível alterar o vídeo";
            deleteFile(req.caminho);
            console.log("erro = ", error);
        }            
    }
    console.log('resp',resposta);
    resp.json(resposta);
})
});

router.delete("/:id?", function(req, resp, next){
    GaleriaModel.deleteVideo(req.params.id,function(error, retorno){
        let resposta = new RespostaClass();

        if(error){
            resposta.error = true;
            resposta.msg = "Ocorreu um erro";
            console.log("erro = ", error)
        }else {
            if(retorno.affectedRows > 0 ) {
                resposta.msg = "Deleção realizada com sucesso";
            } else {
                resposta.error = true;
                resposta.msg = "Não foi possível deletar o vídeo"
                console.log("erro: ", error);
            }
        }

        resp.json(resposta);
    });
});


module.exports = router;   
 


    





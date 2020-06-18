import { ConfigClass } from '../classes/ConfigClass'

//let caminho = `${ConfigClass.getUrlApi().toString()}/galeria/`;

let caminho = `${ConfigClass.getUrlApi().toString()}/galeria/`;

export default class GaleriaService {
    constructor()
    {

    }
    
    static getAll(){        
        //console.log(caminho);
        return fetch(caminho).then(resposta => {  
            //console.log(resposta.getUrlApi.toString() + " AOK");
            return resposta.json();
        })
    }

    static editVideo(formData){       
        return fetch(caminho, 
            {
                method: "PUT",
                body: formData
            }        
        ).then(resposta => {
            return resposta.json();
        })
    }

    static addVideo(formData){       
        return fetch(caminho, 
            {
                method: "POST",
                body: formData
            }        
        ).then(resposta => {
            return resposta.json();
        })
    }

}
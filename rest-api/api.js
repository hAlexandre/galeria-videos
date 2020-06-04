const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const api = express();
const port = 3000;
const router = express.Router();

const galeriaRouter = require('./router/galeriaRouter');

api.use(cors());
api.use(bodyParser.urlencoded({extended: true}))


router.get("/", (req, resp) => resp.json({
    mensagem: '=> API Online'
}))





api.use("/", router);
api.use("/galeria", galeriaRouter);
api.use("/public", express.static(__dirname+"/public"));
api.listen(port);
console.log('API Rodando');
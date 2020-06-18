<template>
  <div>
    <h4>Cadastro de Vídeos</h4>      

    <div id='msg' v-html="mensagem"></div> 

    <button id="btn-cadastrar" type="submit" class="btn btn-primary mr-lm-4"
    v-on:click="switchForm()" v-show="showList">
      Novo Vídeo
    </button>

    
    
    <div id = 'msg'></div>
    
    <div id = 'galeria-listagem' class = 'format' v-show="showList">
      <div class = "table-responsive">
        <table class = "table table-striped table-bordered table-hover table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Vídeo</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" v-bind:key="item">
              <td>{{item.id_galeria_video}}</td>
              <td>{{item.titulo}}</td>
              <td><video v-bind:src="item.caminho" width="180" height="155" controls></video></td>
              <td>Editar</td>
              <td>Deletar</td>
            </tr>
          </tbody>
        </table>
      </div> 
    </div>

    <div id = "formulario" v-show="!showList">
      <div class = "row">
        <div class = "col-sm">
          <form method = "POST" action="/" id = "galeriaForm" v-on:submit.prevent="save">
                        
            <div class = "form-group">
              <label for="id">Título</label>
              <input type="text" class="form-control" id="titulo" name="titulo" 
              placeholder="Insira um título" 
              v-model="register.titulo">
            </div>

            <div class = "form-group">              
              <input type="file" class="form-control-file" id="arquissvo" 
              v-on:change="loadVideo($/event)"
              ref="arquissvo"
              name="arquissvo">
            </div>

            <div class = "form-group">
              <video v-bind:src="videoUrl" width="180" height="155" controls></video>
            </div>

            <div class = "form-inline" >
                <button id="btn-cadastrar" type="submit" class="btn btn-primary mr-sm-2">Enviar</button>
                <button id="btn-cancelar" type="button" class="btn btn-primary"  v-on:click="switchForm()">Cancelar</button>
            </div>
              

          </form>
        </div>
      </div>
    </div>





  </div>
  
</template>

<script>
export default {
  name: 'ManterGaleria',
  props: {
    
  },
  data( ){
    return {
      showList: true,
      list: null,
      mensagem: "",
      videoUrl: "",
      videoFile: "",
      register: {
        titulo: "",
        id: null
      },
      registerFormData: null
    }
  },

  methods: {
    listData(){            
      this.$galeriaService.getAll().then(response => {
        if(response.error){
          console.log("ERROOOOO");
        } else {
          this.list = response.dados.map(function(objeto){
            return { 
              id_galeria_video: objeto.id_galeria_video,
              titulo: objeto.titulo,
              caminho: this + (objeto.caminho? objeto.caminho.substring(1) : objeto.caminho)
            }
          } , this.$server);          
        }
      }).catch(response => {
        console.log(response);
        
      });
    },
    showAlert(msg, type) {
      let dados = "";
      console.log(msg);
      if (type == "success") {
        dados =`<div class='alert alert-success' roles='alert'>
                <strong>${msg}</strong></div>`;
      } else if (type == "error") {
        dados =`<div class='alert alert-danger' roles='alert'> 
                  <strong>${msg}</strong>
                </div>`;
      }
      this.mensagem = dados;
    },
    cleanMsgAlert() {
      this.mensagem = "";
    },
    switchForm() {
      this.showList = !this.showList;
      this.cleanMsgAlert();
      
      //clean form
      this.videoUrl = "";
      this.videoFile = null;
      this.registerFormData = new FormData();
      this.register = { titulo: "" };
      
      document.getElementById("galeriaForm").reset();
      

    },
    
    loadVideo (){
      if(this.$refs.arquissvo.files.length > 0) {
        const reader = new FileReader();
        const file = this.$refs.arquissvo.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          const dataUrl = reader.result;
          this.videoUrl = dataUrl;
          this.videoFile = file;
        }
      }
    },

    save() {
      
      this.registerFormData = new FormData();
      this.registerFormData.append('titulo', this.register.titulo);
      this.registerFormData.append('file', this.videoFile);
      this.insert(this.registerFormData);
    
    },

    insert(dataForm) {      
      
      this.$galeriaService.addVideo(dataForm).then(response => {         
        if (this.checkHttpResponse(response)) {
          
          this.listData();
          this.switchForm();
          this.showAlert("Cadastro realizado com sucesso", "success");
          
        }
        
        
      }).catch(responsez => {
        this.showAlert("Erro ao executar o cadastro", "error");
        console.log(responsez);
      })
    },

    checkHttpResponse(resp) {              
      if(resp.error) {        
        this.showAlert (resp.msg, "error");
        return false
      } else {
        if (resp.msg != null) {          
          this.showAlert (resp.msg, "success");
          return true
        }
      }
      
    }

  },

  mounted(){
      this.listData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .format{
    padding-top: 5px;
    padding-bottom: 5px;
  }
</style>

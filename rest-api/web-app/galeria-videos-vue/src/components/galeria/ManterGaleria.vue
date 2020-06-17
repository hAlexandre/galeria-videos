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
          <form method = "POST" action="/" id = "galeriaForm">
            <div class = "form-group">
              <label for="id">Título</label>
              <input type="text" class="form-control" id="titulo" name="titulo" placeholder="Insira um titulo">
            </div>

            <div class = "form-group">              
              <input type="file" class="form-control-file" id="arquivo" 
              v-on:change="loadVideo($/event)"
              ref="arquivo"
              name="arquivo">
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
      videoFile: ""
    }
  },

  methods: {
    listData(){            
      this.$galeriaService.getAll().then(response => {
        if(response.erro){
          console.log("ERROOOOO");
        } else {
          console.log("UHUL");
          
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
      if (type == "success") {
        dados =`<div class='alert alert-success' roles='alert'> 
                  <strong>$(msg)</strong>
                </div>`;
      } else if (type == "error") {
        dados =`<div class='alert alert-danger' roles='alert'> 
                  <strong>$(msg)</strong>
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
    },
    
    loadVideo (){
      if(this.$refs.arquivo.files.length > 0) {
        const reader = new FileReader();
        const file = this.$refs.arquivo.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          const dataUrl = reader.result;
          this.videoUrl = dataUrl;
          this.videoFile = file;
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

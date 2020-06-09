<template>
  <div>
    <h4>Cadastro de Vídeos</h4>
    <div id = 'msg'></div>
    <div id = 'listagem'>

    </div>
    <div id = 'galeria-listagem'>
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
            <tr>
              <td>ID</td>
              <td>Título</td>
              <td>Vídeo</td>
              <td>Editar</td>
              <td>Deletar</td>
            </tr>
          </tbody>
        </table>
      </div> 
    </div>

    <div id = "formulario">
      <div class = "row">
        <div class = "col-sm">
          <form method = "POST" action="/" id = "galeriaForm">

            <div class = "form-group">
              <label for="id">ID</label>
              <input type="number" class="form-control" id="id_video" name="id_video" disabled>
            </div>

            <div class = "form-group">
              <label for="id">Título</label>
              <input type="text" class="form-control" id="titulo" name="titulo" placeholder="Insira um titulo">
            </div>

            <div class = "form-group">
              <label for="video">Vídeo</label>
              <input type="file" class="form-control-file" id="arquivo" name="arquivo">
            </div>

            <div class = "form-group">
              <video src="/" width="180" height="155" controls></video>
            </div>

            <div class = "form-inline">
                <button id="btn-cadastrar" type="submit" class="btn btn-primary mr-sm-2">Enviar</button>
                <button id="btn-cancelar" type="button" class="btn btn-primary">Cancelar</button>
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

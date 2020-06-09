<template>
  <div id="app">
      <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal">Galeria de vídeos</h5>
      <nav class="my-2 my-md-0 mr-md-3">     
        <router-link class = "p-2 text-dark" to = "Home">Home</router-link>
        <router-link class = "p-2 text-dark" to = "ManterGaleria">Galeria</router-link>
      </nav>
      <!--<a class="btn btn-outline-primary" href="#">Sign up</a>-->
    </div>

    <div class = "container">
      <router-view></router-view>
    </div>   
    
      
      
    
    

  </div>
  
</template>

<script>


import ManterGaleria from './components/galeria/ManterGaleria.vue'
import Home from './components/home/Home.vue'

export default {
  name: 'App',
  components: {
    //Home,
    //ManterGaleria
    
  }
}
</script>

<style>
#app {
  
}
</style>

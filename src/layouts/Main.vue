<template>

  <div  class="pushable">

        <!-- Sidebar -->
        <div class="ui sidebar visible inverted vertical menu left no-print">
          <!-- Logo -->
          <div class="ui logo item">
            <b><i class="icon tasks purple"></i>Digi Books - v{{$root.version}}</b>
          </div>
          <!-- Header -->
          <div class="item">
            <div class="ui message green">
              Book Keeping Application
            </div>
          </div>
          <!-- Message -->
          <div class="item" v-if="$root.message">
              <div class="ui message blue">
                <i class="icon info" ></i>  {{$root.message}}
              </div>
          </div>

          <!-- Menu Buttons -->
          <div class="item">
            <v-link href="/">
            <button class="ui green button fluid"> 
              <i class="list icon"></i>Transactions
            </button>
            </v-link>

            <div class="bottom-gap"></div>

            <v-link href="/summary">
            <button class="ui green button fluid"> 
              <i class="calculator icon"></i>Summary
            </button>
            </v-link>

            <div class="bottom-gap"></div>
          
            <button class="ui green button fluid" @click="$root.importCSV"> 
              <i class="icon table"></i>Import CSV
            </button>

            <div class="bottom-gap"></div>

            
            <button class="ui green button fluid" @click="$root.saveFile2"> 
              <i class="icon download"></i>Save
            </button>

            <div class="bottom-gap"></div>

            <button class="ui green button fluid" @click="$root.loadFile"> 
              <i class="icon upload"></i>Load
            </button>
            
            <div class="bottom-gap"></div>

            <button class="ui green button fluid" @click="$root.printDocument"> 
              <i class="icon print"></i>Print
            </button>

            <div class="bottom-gap"></div>

            <v-link href="/about">
            <button class="ui green button fluid"> 
              <i class="icon info circle"></i>About
            </button>
            </v-link>
          </div>

          <!-- Transaction Count -->
          <div class="item orange">
              <div class="ui message blue">
                <i class="icon ellipsis vertical" ></i> Record Count: {{$root.filteredTransactions.length}}
              </div>
          </div>

        </div> <!-- Sidebar -->
    <!-- Main Content -->
  
            <slot></slot>
         
  </div>

</template>

<script>
  import VLink from '../components/VLink.vue'

  export default {
    components: {
      VLink
    }
  }
</script>

<style scoped>

</style>

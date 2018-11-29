<template>
  <main-layout>

    <div class="ui pusher left-gap">
    
      <div class="ui hidden divider"></div>
        
      <div class="ui grid mygrid">

        <div class="twelve wide column center aligned">
          <div class="ui teal inverted segment">               
              <div><h3>Summary</h3></div>
          </div>
        </div>

        <div class="twelve wide column">
          <table class="ui striped blue padded compact celled collapsing table">
            <thead>
              <tr>
                <th class="six wide">Category</th>
                <th class="three wide right aligned" >Credit</th>
                <th class="three wide right aligned" >Debit</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>UNCATEGORISED</td>
                <td class="right aligned" >{{$root.totalCategoryCredit('')}}</td>
                <td class="right aligned" >{{$root.totalCategoryDebit('')}}</td>
              </tr>

              <tr v-for="c in $root.categoriesCredit">
                <td>{{c[0].toUpperCase() + c.substr(1)}}</td>
                <td class="right aligned" >{{$root.totalCategoryCredit(c)}}</td>
                <td class="right aligned" >{{$root.totalCategoryDebit(c)}}</td>
              </tr>

              <tr v-for="c in $root.categoriesDebit">
                <td>{{c[0].toUpperCase() + c.substr(1)}}</td>
                <td class="right aligned" >{{$root.totalCategoryCredit(c)}}</td>
                <td class="right aligned" >{{$root.totalCategoryDebit(c)}}</td>
              </tr>

            </tbody>

            <tfoot>
              <tr>
                <th>TOTALS</th>
                <th class="right aligned" >{{$root.totalCredits}}</th>
                <th class="right aligned" >{{$root.totalDebits}}</th>
              </tr>
            </tfoot>
          </table>
          
          <div class="ui hidden divider"></div>
          <div class="ui hidden divider"></div>
          <div class="ui hidden divider"></div>
       
        </div>

       

      </div>
    
    
    </div>
  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'

  export default {
    components: {
      MainLayout
    }
  }
</script>

<template>
  <main-layout>
    <div class="ui pusher left-gap">
          
      <div class="ui grid mygrid">
    <!-- Filter Section -->
            <div class="twelve wide column">
              <div class="ui teal inverted segment">
                <div class="ui grid">
                  
                  <div class="four column row">
                    <!-- Date Filters -->
                    <div class="three wide column">
                        <div class="ui form">
                          
                          <div class="field">
                            <label for="">Date From:</label>
                            <input type="date" name="date_from" placeholder="Date From" />
                          </div>
                          
                          <div class="field">
                              <label for="">Date To:</label>
                              <input type="date" name="date_to" placeholder="Date To" />
                            </div>
                          </div>
                    </div>
                    <!-- Description Filter -->
                    
                    <div class="four wide column">
                        <form class="ui form">
                            
                          <div class="field" style="margin-bottom: 0px;">
                              <label for="">Description:</label>
                          </div>  

                          <div class="inline fields">   
                              <div class="sixteen wide field">
                                <input type="text" name="description" placeholder="Description like..." v-model="$root.descriptionLike" />
                              </div>

                              <div class="four wide field" style="margin-left: -14px;">
                                  <button class="ui icon button" @click.prevent="$root.descriptionLike=''">
                                      <i class="delete icon"></i>
                                  </button>
                              </div>
                          </div>
                   
                        </form>
                    </div>

                     <!-- Debit/Credit Filters -->
                    <div class="four wide column">
                        
                        <div class="ui hidden divider"></div>
                        <div class="ui checkbox">
                            <input type="checkbox" name="debitOnly" v-model="$root.debitOnly">
                            <label>Debit Only</label>
                        </div>

                        <div class="bottom-gap"></div>
                        
                        <div class="ui checkbox">
                            <input type="checkbox" name="excreditOnlyample" v-model="$root.creditOnly">
                            <label>Credit Only</label>
                        </div>

                        <div class="ui hidden divider"></div>
                        
                        <div class="ui checkbox">
                            <input type="checkbox" name="excreditOnlyample" v-model="$root.uncategorisedOnly">
                            <label>Uncategorised Only</label>
                        </div>

                    </div>

                     <!-- Category Filters -->
                    <div class="four wide column">
                        <form class="ui form">
                            <div class="field">
                              <label for="">Category:</label>
                              <select-category toptext="UNCATEGORISED" v-model="$root.selectedCategory" @changed="$root.selectedCategory = $event"></select-category>
                            </div>

                            <button class="ui small button blue fluid" @click.prevent="$root.setAllCategories">
                                Apply to all Selected
                            </button>
                            <div class="bottom-gap"></div>
                            <button class="ui small button blue fluid" @click.prevent="$root.selectUndefined">
                                Select all Uncategorised
                            </button>
                            
                          </form>

                    </div>

                  </div>
                </div>
                

              </div>

            </div> <!-- end Filter Section -->

            <div class="twelve wide column" v-show="$root.csvLoading.is">
              <div class="ui icon message">
                <i class="notched circle loading icon"></i>
                <div class="content">
                  <div class="header">
                    Just one second
                  </div>
                  <p>We're fetching that content for you.</p>
                </div>
              </div>
            </div>

            <!-- Transaction List -->
            <div class="twelve wide column">
             
             
              
                  <table id="paginate" class="ui striped blue padded compact table" v-show="!$root.csvLoading.is">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th class="six wide">Description</th>
                          <th>Credit</th>
                          <th>Debit</th>
                          <th>Category</th>
                          <th></th>
                          <th><input type="checkbox" v-model="$root.allSelected"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="t in $root.filteredTransactions" :key="t.id">
                          <td>{{t.date}}</td>
                          <td>{{t.description}}</td>
                          <td class="right aligned" v-if="t.credit != 0">{{t.credit.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}}</td><td v-else></td>
                          <td class="right aligned" v-if="t.debit != 0">{{t.debit.toLocaleString('en-US', {style: 'currency', currency: 'USD',})}}</td><td v-else></td>
                          <td style="padding-right: 0px;">
                            <select-category class="in-table-dropdown" toptext="UNCATEGORISED"  key="t.id" :value="t.category" v-model="t.category" @changed="t.category = $event"></select-category>
                          </td> 
                          <td style="padding: 0px;">   
                            <button class="ui compact icon button" @click="t.category = ''">
                              <i class="delete icon"></i>
                            </button>
                          </td>  
                          <td><input type="checkbox" v-model="t.isSelected"></td>
                        </tr>
                      </tbody>
                  </table>

             
           
            </div> <!-- Transaction List -->
      </div> <!-- grid -->
    </div>   <!-- Main Content --> 
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

<template>
  <div class="home">
    <br>
    <button class="button is-info" v-on:click="LogMeOut">Logout</button>
    <Loader v-if="isLoading"/>
    <br>
    <br>
    <div class="container is-mobile">
      <div class="columns is-multiline">
         <div class="container">
            <h1 v-if="customers.length <= 0" class="subtitle is-text-centered is-5">
            No Current data available in this page</h1>
         </div>
        <div
          class="column is-one-third is-full-mobile"
          v-for="item in customers"
          v-bind:key="item.id"
        >
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img v-bind:src="item.avatar" alt="Placeholder image" />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-left"></div>
                <div class="media-content">
                  <span class="subtitle is-6">{{item.first_name}}</span>,
                  <span class="subtitle is-6">{{item.last_name}}</span>
                  <p class="subtitle is-6">{{item.email}}</p>
                </div>
              </div>
            </div>
            <div class="content is-1">
              <br />
              <div class="columns">
                <div class="column ">
                  <span class="holder">
                    <button class="button is-success" @click="EditCustomer(item)">Edit</button>
                  </span>
                  <span class="holder">
                    <button @click="deleteCustomer(item.id)" class="button is-danger is-3">
                      Delete</button>
                  </span>
                </div>
              </div>
              <br>
              <time datetime="2016-1-1">_</time>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="container">
    <nav class="pagination" role="navigation" aria-label="pagination">
      <ul class="pagination-list">
        <li v-for="item in totalPages" v-bind:key="item">
          <a class="pagination-link" v-bind:class="{ 'is-current': currentPage == item }"
          @click="getPagedData(item)"
          aria-label="Goto page 1">{{item}}</a>
        </li>
      </ul>
    </nav>
    </div>
    <div class="modal is-active" v-if="showModal">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Update User</p>
              <button class="delete" @click="toggleModal" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
               <form @submit.prevent="editUser" class="login">
                <div class="field">
                  <label for="" class="label">Name</label>
                  <div class="control has-icons-left">
                    <input type="email" v-model="name"
                    :placeholder="name"
                    class="input" required>
                    <span class="icon is-small is-left">
                      <i class="fa fa-user"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">job</label>
                  <div class="control has-icons-left">
                    <input type="text"
                    v-model="job"
                    placeholder="job"
                    class="input" required>
                    <span class="icon is-small is-left">
                      <i class="fa fa-cog"></i>
                    </span>
                  </div>
                </div>
                <br>
              </form>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success" :disabled="invalidForm" @click="editUser">
                Save changes</button>
              <button class="button" @click="toggleModal">Cancel</button>
            </footer>
          </div>
        </div>
    <br />
  </div>
</template>
<style lang="scss" scoped>
  .holder{
    margin:5px
  }
</style>
<script>
/* eslint-disable */
import Loader from '@/components/Loader.vue';
export default {
  name: "home",
  data() {
    return {
      alert: "",
      showModal: false,
      customer:0,
      name:'',
      job:'',
      isLoading:false,
    };
  },
  created() {
    this.$store.dispatch("loadCustomers",this.currentPage);
  },
  computed: {
    invalidForm(){
      return !this.job || !this.name
    },
    customers() {
      return this.$store.getters.loadedCustomers;
    },
    totalPages() {
      return this.$store.getters.getTotalPages;
    },
    currentPage() {
      return this.$store.getters.getCurrentPage;
    },
  },
  mounted() {

  },
  methods: {
    editUser () {
       this.$store.dispatch('updateCustomer', {"id":this.customer , "name": this.name, "job": this.job })
        this.toggleModal();
    },
    EditCustomer(customer){
      console.log(customer) 
      this.customer = customer.id
      this.name = customer.email
      this.job = customer.first_name
      this.toggleModal();
    },
    deleteCustomer(customer){
      this.isLoading = true
      console.log(customer)
      this.$store.dispatch("deleteCustomer",customer).then(() => this.isLoading = false)
    },
    LogMeOut() {
      localStorage.clear();
      this.$store.dispatch("setError");
      this.$router.push(`/`);
    },
    getPagedData(number){
      this.$store.dispatch("loadCustomers",number)
    },
    toggleModal() {
      this.showModal = !this.showModal;
    }
  },
  components: {
    Loader,
  }
};
</script>

<template>
    <div class="Login">
      <section class="hero is-primary is-fullheight">
      <Loader v-if="isLoading"/>
      <br>
      <p v-if="errorState" class="has-text-danger">Invalid Login credentials</p>
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form @submit.prevent="onSignIn" class="login box">
                <div class="field">
                  <label for="" class="label">Email</label>
                  <div class="control has-icons-left">
                    <input type="email" v-model="email"
                    placeholder="e.g. bobsmith@gmail.com"
                    class="input" required>
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">Password</label>
                  <div class="control has-icons-left">
                    <input type="password"
                    v-model="password"
                    placeholder="*******"
                    class="input" required>
                    <span class="icon is-small is-left">
                      <i class="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
                <br>
                <div class="field">
                  <div class="columns">
                    <button class="button is-success">
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
/* eslint-disable */
import Loader from '@/components/Loader.vue';
export default {
  data () {
    return {
      email:'',
      password:'',
      LoadingBTN:false,
      errorState:false,
      isLoading:false,
    }
  },
  components: {
    Loader,
  },
   methods : {
    onSignIn () {
      const { email, password } = this
      this.isLoading = true
      this.$store.dispatch('signInUser', { "email": email, "password": password })
      .then(data => {
        console.log(data)
        if(data.status == '200'){
          this.$router.push('/home')
         this.$store.dispatch('loadCustomers');
         this.isLoading = false
        }
      }).catch(err => {
        if (err){
          this.errorState = true
          this.isLoading = false
        }
        return false
      })
    },
    onDismissed () {
      this.$store.dispatch('clearError');
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.getIsLoading;
    },
  },
}
</script>
<style lang="scss" scoped>
  
</style>

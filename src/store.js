/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import Services from './Api'
import router from './router'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    customers: [],
    user: null,
    loading: null,
    error:  false,
    success: null,
    Alert: true,
    page:1,
    Totalpages:null,
    token: localStorage.getItem('token') || '',
    status:null,
  },
  mutations: {
    editCustomer(state,payload){
        for (var i in state.customers) {
          if (state.customers[i].id == payload.id) {
             state.customers[i].first_name = payload.name;
             break; 
          }
        }
    },
    deleteCustomer(state,payload){
      state.customers = state.customers.filter(item => item.id!= payload)
    },
    setTotalPages(state,payload){
      state.Totalpages = payload
    },
    setPaging(state,payload) {
      state.page = parseInt(payload)  
    },
    loadCustomers (state, payload) {
      state.customers = payload;
    },
    signInUser(state,payload) {
      state.user = payload;
    },  
  },
  actions: {
    updateCustomer({commit},payload){
      commit('editCustomer',payload)
      console.log(payload);
      return new Promise ((resolve, reject) => {
        Axios({url: `${Services.customers}/${payload.id}`, method: 'PUT' })
          .then(resp => {
            console.log(resp)
            resolve(true)
          })
          .catch(err => {
            console.log(err)
            localStorage.removeItem('token') // if the request fails, remove any possible user token if possible
            reject(err)
          })
      })
    },
    loadCustomers ({commit},payload) {
      return new Promise ((resolve, reject) => {
        Axios({url: `${Services.customers}?page=${payload}` , method: 'GET' })
          .then(resp => {
            console.log(resp)
            commit('setTotalPages',resp.data.total)
            resolve(commit('loadCustomers',resp.data.data))
            commit('setPaging',payload)
          })
        .catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },
    deleteCustomer ({commit},payload) {
      return new Promise ((resolve, reject) => {
        Axios({url: `${Services.customers}/${payload}`, method: 'DELETE' })
          .then(resp => {
            console.log(resp)
            resolve()
            commit('deleteCustomer',payload)
          })
        .catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },
    signInUser({commit},payload){
      return new Promise ((resolve, reject) => {
        Axios({url: Services.login , data: payload, method: 'POST' })
          .then(resp => {
            console.log(resp)
            const token = resp.data.token
            localStorage.setItem('token', token) // store the token in localstorage
            resolve(resp)
          })
          .catch(err => {
            console.log(err)
            //commit('setError')
            localStorage.removeItem('token') // if the request fails, remove any possible user token if possible
            reject(err)
          })
      })
    },
    handleLogout(){
      localStorage.clear()
      router.push('/')
    },
  },
  getters:{
    loadedCustomers: state => state.customers,
    isAuthenticated: state => !!state.token ,
    authStatus: state => state.status,
    getTotalPages: state => state.Totalpages,
    getCurrentPage: state => state.page,
  }
})
export default store;
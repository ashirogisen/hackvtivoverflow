<template>
  <b-navbar id="nav" toggleable="lg" type="dark" variant="dark">
     <img href="#" @click="checktoken()" id="nav-img" src="https://i.imgur.com/AA9mZ2H.png"> 
        <b-navbar-nav>
          <b-button class="buttons" v-if="!isLogin" variant="success" router-link to="/"><strong> Login</strong></b-button>
          <b-button class="buttons" v-if="!isLogin" variant="danger" router-link to="/register"><strong>Register</strong></b-button>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <!-- <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0">Search</b-button> -->
          <b-button @click="logout()" v-if="isLogin" class="buttons" variant="danger" router-link to="/"><strong>Logout</strong></b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
</template>

<script>
import Swal from 'sweetalert2'
import { mapState } from 'vuex';

export default {
    name: 'navbar',
    computed: {
        ...mapState([
            'isLogin'
        ])
    },
    methods: {
        logout () {
            Swal.fire(
                    'Logged Out',
                    `Success!`,
                    'success'
                )
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>
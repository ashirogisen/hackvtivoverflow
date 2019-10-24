<template>
  <div id="app">
    <router-view :checktoken="checktoken"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState([
        'isLogin',
    ])
  },
  methods: {
    checktoken () {
      let token = localStorage.getItem('token');
      if (token) {
          this.changeIsLogin(true);
          this.$router.push('/questions')
      } else {
          this.changeIsLogin(false);
          this.$router.push('/login')
      }
    },
    ...mapActions([
        'changeIsLogin'
    ])
  },
  created() {
    this.checktoken()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 12px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
}

.buttons {
    margin: 5px;
    font-weight: bold;
}

#nav-img {
  width:238px;
  height:80px;

  margin-right: 30px;
}

#nav {
  border-top: 3px solid rgb(219, 117, 0);
  padding: 10px;
}

.bg-light {
  background-color: black !important;
}
</style>



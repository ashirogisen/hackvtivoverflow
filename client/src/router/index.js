import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Question from '../views/Question.vue'
import DetailsQuestion from '../components/DetailsQuestion.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path:'/register',
    name: 'register',
    component: Register
  },
  {
    path: '/questions',
    name: 'question',
    component: Question,
    children: [{
      path: '/questions/:id',
      name: 'detailsquestion',
      component: DetailsQuestion,
      props: true
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

<template>
  <div id="question">
      <Navbar />
    <b-container class="bv-example-row container">
        <b-row>
            <b-col id="two" sm="3">
                <div id="sidebar">
                    <h4 id="menu">Menu</h4> <br>
                    <b-button id="buttonTrans" @click="toHome()" variant="warning">Home</b-button><br><br>
                    <b-button id="buttonTrans" @click="toProfile()" variant="primary">Profile</b-button><br><br>
                </div>
            </b-col>
            <b-col id="seven" sm="9">
                <!--DefaultDisplayQuestions-->
                <div v-if="inHome" id="homeQuestions">
                    <center>
                        <img class="ask mx-auto my-2" src="https://i.imgur.com/9z9JdXC.png" alt="questions">
                        <button class="btn btn-success d-block" data-toggle="collapse" data-target="#collapse-btn-1">Ask Question</button> <br>
                        <div class="card mb-3" v-if="isLogin">
                            <div class="collapse" id="collapse-btn-1">
                                <div class="card-body">
                                    <form @submit.prevent="createQuestion()" class="mb-2">
                                        <div class="form-group">
                                            <input type="text" v-model="createdQuestion.title" class="form-control" placeholder="Title">
                                        </div>
                                        <div class="form-group">
                                            <vue-editor v-model="createdQuestion.description"></vue-editor>
                                        </div>
                                        <button type="submit" class="btn btn-primary btn-block font-weight-bold">Post</button>
                                    </form>
                                </div>
                            </div>
                        </div> <br>
                        <h3> Top Questions </h3> <br>
                        <div v-for="(question, index) in questions" :key="index" id="topQuestions">
                            <TopQuestions :toDetails="toDetails" :question="question"/>
                        </div>
                        
                    </center>
                </div>

                <!--DetailsQuestion-->
                <div v-if="inDetails && !inHome" id="detailsQuestion">
                    <DetailsQuestion :toHome="toHome" :details-data="detailsData"  />
                </div>

                <!--Profile-->
                <div id="profile" v-if="inProfile">
                    <Profile :getProfileDatas="getProfileDatas" :myAnswers="myAnswers" :myQuestions="myQuestions" />
                </div>
            </b-col> 
        </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { VueEditor } from 'vue2-editor';
import axios from 'axios'
import Swal from 'sweetalert2'
import TopQuestions from '../components/TopQuestions'
import DetailsQuestion from '../components/DetailsQuestion'
import Profile from '../components/Profile'
import Navbar from '../components/Navbar'

export default {
    name: 'questions',
    data() {
        return {
             createdQuestion: {
                title: '',
                description: ''
            },
            inHome: true,
            inDetails: false,
            inProfile: false,
            detailsData: '',
            myQuestions: '',
            myAnswers: ''
        }
    },
    props: ['checktoken'],
    components: {
        VueEditor,
        TopQuestions,
        DetailsQuestion,
        Profile,
        Navbar
    },
    computed: {
        ...mapState([
            'isLogin',
            'questions'
        ])
    },
    methods: {
        getMyQuestions() {
            const token = localStorage.getItem('token')

            axios({
                method: 'get',
                url: `http://localhost:3000/questions`,
                headers: {token}
            })
                .then(({data}) => {
                    this.myQuestions = data.reverse()
                })
                .catch(err => {
                    console.log(err)
                })

        },
        getMyAnswers() {
            const token = localStorage.getItem('token')

            axios({
                method: 'get',
                url: `http://localhost:3000/answers/`,
                headers: {token}
            })
                .then(({data}) => {
                    // console.log('users answer => ', data)
                    this.myAnswers = data.reverse()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getProfileDatas() {
            this.getMyAnswers()
            this.getMyQuestions()
        },
        toProfile() {
            this.inHome = false
            this.inDetails = false
            this.inProfile = true
        },
        toHome() {
            this.inHome = true
            this.inDetails = false
            this.inProfile = false
            this.getQuestions()
        },
        toDetails(data) {
            this.detailsData = data
            this.inDetails = true
            this.inHome = false
            this.inProfile = false

            axios({
                method: 'patch',
                url: `http://localhost:3000/questions/views/${data._id}`
            })
                .then(({data}) => {
                    console.log('views updated', data)
                })
                .catch(err => {
                    console.log(err)
                })

        },
         ...mapActions([
            'getQuestions'
        ]),
        createQuestion() {
            const token = localStorage.getItem('token')
            axios({
                method: 'post',
                data: {
                    title: this.createdQuestion.title,
                    description: this.createdQuestion.description
                },
                headers: {token},
                url: `http://localhost:3000/questions`
            })
                .then(({data}) => {
                    Swal.fire(
                        'Question is asked!',
                        `Success`,
                        'success'
                    )
                    this.createdQuestion.title = ''
                    this.createdQuestion.description = ''
                    this.checktoken()
                    this.getQuestions()
                })
                .catch(err => {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: JSON.parse(err.response.request.response).message[0]
                    })
                })
        }
    },
    created() {
        this.getQuestions()
        // this.getMyAnswers()
        this.getMyQuestions()
        this.createdQuestion.title = ''
        this.createdQuestion.description = ''
    }

}
</script>

<style>
.container {
    padding-top: 20px;
}

#two {
    border-right: 1px solid black;
}

#seven {
    border-right: 1px solid black;
}

.ask {
    width: 350px;
    height: 250px;
}

.btn {
    font-weight: 1000;
}

#two {
    text-align: left;
}

#sidebar {
  height: 1200px;
  font-weight: bold;
  background-color: #343A40;
  padding: 20px;
  color: white;
  border-radius: 10px;
}

#menu {
    border-bottom: 1px solid white;
}

#buttonTrans {
  border: none;
  padding: 10px;
  width: 80px;
  border-radius: 5px;
  transition: all 0.1s ease-in-out;
  font-weight: bold;
}

#buttonTrans:hover {
  background-color: #ff7979;
  color: black;
  font-weight: bold;
  transform: rotate(10deg);
}
</style>
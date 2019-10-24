<template>
  <div id="detailsQuestion">
        <b-button id="back" @click="toHome()" variant="secondary"><i class="fas fa-undo-alt"></i> Back</b-button><br><br>
      <div id="currentQuestion">
        <h4 id="title">{{fromDetailsData.title}}</h4>
        <b-container class="bv-example-row">
          <b-row>
            <b-col id="one" cols="1">
              <center>
                <button class="btn btn-success" @click="upvoteQuestion()">
                  <img id="up" src="https://image.flaticon.com/icons/png/512/25/25282.png">
                </button>
                <div class="mr-2">{{ fromDetailsData.upvotes.length }}</div>
                <button class="btn btn-danger" @click="downvoteQuestion()">
                  <img id="down" src="https://i.imgur.com/Xfitx4A.png">
                </button>
              </center>
            </b-col>
            
            <b-col v-html="fromDetailsData.description" cols="11"></b-col>
            <b-badge id="from" pill variant="info">From: {{this.detailsData.user.name}}</b-badge>
          </b-row>
        </b-container>
      </div>
      
      <div id="answerSection"><br>
        <div v-for="(answer, index) in answers" :key="index">
          <b-card class="text-left">
            <b-container class="bv-example-row">
              <b-row>
                <b-col id="one" cols="1">
                  <center>
                  <button class="btn btn-success" @click="upvoteAnswer(answer._id)">
                      <img id="up" src="https://image.flaticon.com/icons/png/512/25/25282.png">
                  </button>
                  <div class="mr-2">{{ answer.upvotes.length }}</div>
                  <button class="btn btn-danger" @click="downvoteAnswer(answer._id)">
                      <img id="down" src="https://i.imgur.com/Xfitx4A.png">
                  </button>
                  </center>
                </b-col>
                <b-col v-html="answer.description" cols="11"></b-col>
                <b-badge id="from" pill variant="warning">From: {{answer.user.name}}</b-badge>
              </b-row>
            </b-container>
          </b-card><br>
        </div>
        <h4> Add an answer </h4><br>
        <div id="answer-container">
          <vue-editor v-model="createdAnswer"></vue-editor><br>
          <b-button id="post-answer" @click="createAnswer()" variant="success">Post Your Answer</b-button>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { VueEditor } from 'vue2-editor';
import Swal from 'sweetalert2'

export default {
  name: 'detailsquestion',
  props: ['detailsData', 'toHome'],
  components: {
    VueEditor
  },
  data() {
    return {
      answers: '',
      createdAnswer: '',
      fromDetailsData: this.detailsData
    }
  },
  methods: {
    getDetailsQuestion() {
      const token = localStorage.getItem('token')

      axios({
        method: 'get',
        url: `http://localhost:3000/questions/${this.detailsData._id}`,
        headers: {token}
      })
        .then(({data}) => {
          // console.log('details =>', data)
          this.fromDetailsData = data
        })
    },
    upvoteAnswer(answerId) {
      const token = localStorage.getItem('token')
      axios({
          method: 'patch',
          url: `http://localhost:3000/answers/upvote/${this.fromDetailsData._id}`,
          data: {
              id: answerId
          },
          headers: {token}
      })
          .then((result) => {
              this.displayAnswers();
          })
          .catch((err) => {
              console.log('Upvote Answer Error: ', err);
          });
    },
    downvoteAnswer(answerId) {
      const token = localStorage.getItem('token')
      axios({
          method: 'patch',
          url: `http://localhost:3000/answers/downvote/${this.fromDetailsData._id}`,
          data: {
              id: answerId
          },
          headers: {token}
      })
          .then((result) => {
              this.displayAnswers();
          })
          .catch((err) => {
              console.log('Downvote Answer Error: ', err);
          });
    },
    upvoteQuestion() {
      const token = localStorage.getItem('token')
      axios({
          method: 'patch',
          url: `http://localhost:3000/questions/upvote/${this.fromDetailsData._id}`,
          headers: {token}
      })
          .then((result) => {
              // console.log('sukses upvote question')
              this.getDetailsQuestion()
          })
          .catch((err) => {
              console.log('Upvote Question Error: ', err);
          });
    },
    downvoteQuestion() {
      const token = localStorage.getItem('token')
      axios({
          method: 'patch',
          url: `http://localhost:3000/questions/downvote/${this.fromDetailsData._id}`,
          headers: {token}
      })
          .then((result) => {
              // console.log('sukses downvote question')
              this.getDetailsQuestion()
          })
          .catch((err) => {
              console.log('Downvote Question Error: ', err);
          });
    },
    displayAnswers() {
      axios({
        method: 'get',
        url: `http://localhost:3000/answers/${this.fromDetailsData._id}`
      })
        .then(({data}) => {
          this.answers = data
        })
    },
    createAnswer() {
      const token = localStorage.getItem('token')

      axios({
        method: 'post',
        url: `http://localhost:3000/answers`,
        data: {
          description: this.createdAnswer,
          question: this.fromDetailsData._id
        },
        headers: {token}
      })
        .then(({data}) => {
          Swal.fire(
              'Your answer is submitted!',
              `Success`,
              'success'
          )
          this.displayAnswers()
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
    this.displayAnswers()
    this.getDetailsQuestion()
    this.createdAnswer = ''
  }
}
</script>

<style scoped>
.btn {
  height: 46px;
  width: 56px;
  margin-bottom: 5px;
}
#title {
  padding-bottom: 14px;
  border-bottom: 1px solid black;
}

.col-11 {
  text-align: left;
}

.fa-chevron-circle-up {
  height: 100px;
}

#up {
  height: 30px;
  width: 30px;
  margin-bottom: 10px;
}

#down {
  height: 30px;
  width: 30px;
}

#currentQuestion {
  border-bottom: 1px solid black;
}

#from {
  margin-left: 620px;
  margin-bottom: 20px;
}

#answer-container {
  margin-bottom: 30px;
  padding-bottom: 30px;
}

#back {
  width: 90px !important;
}

.mr-2 {
  padding-left: 23px;
  font-size: 20px;
  font-weight: bold;
}

#post-answer {
  width: 190px !important;
}

#one {
  padding-right: 30px;
  margin-right: 0px;
}

</style>
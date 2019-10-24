<template>
  <div id="topQuestion">
    <center>
        <b-card bg-variant="dark" text-variant="white" :title="question.title">
            <b-badge id="badge" variant="warning">Views: {{question.views}}</b-badge> <br>
            <b-button @click="toDetails(question)" href="#" variant="primary">Details</b-button><br>
            <b-badge id="name" variant="info">From: {{question.user.name}}</b-badge>
        </b-card>
    </center><br>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: 'topQuestions',
    props: ['checktoken', 'question', 'toDetails'],       
    data: {
        answerCount: 0
    },  
    computed: {
        ...mapState([
            'isLogin',
        ])
    },
    methods: {
        getAnswersCount() {
           const token = localStorage.getItem('token')
           axios({
               methods: 'get',
               url: `http://localhost:3000/answers/${this.question._id}`,
               headers: {token}
           }) 
             .then(({data}) => {
                 console.log('answer count=> ', data.length)
                 this.answerCount = data.length
                 console.log(this.answerCount)
             })
             .catch(err => {
                 console.log(err)
             })
        }
    },
    created() {
        // this.getAnswersCount()
        // console.log('from created => ', this.answerCount)

    }
}
</script>

<style>
#badge {
    margin-bottom: 10px;
    margin-right: 3px;
}

#name {
    margin-left: 520px;
}
</style>
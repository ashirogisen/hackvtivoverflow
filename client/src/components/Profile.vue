<template>
  <div id="profile">
        <b-container class="bv-example-row">
            <b-row>
                <!--MyQuestions-->
                <b-col id="seven" cols="7">
                    <h4 id="my-q">My Questions </h4><br>
                    <div id="my-q-container" v-for="(question, index) in myQuestions" :key="index">
                        <b-card bg-variant="dark" text-variant="white" :title="question.title">
                            <b-card-text v-html="question.description">
                            </b-card-text>
                            <b-button id="edit" data-toggle="modal" data-target="#editQuestionAnswer" variant="primary" @click="editQuestions(question._id, question.title, question.description)">Edit</b-button>
                            <b-button href="#" @click="deleteQuestion(question._id)" variant="danger">Delete</b-button>
                        </b-card><br>
                    </div>
                     <!-- Edit Question Modal -->
                    <div class="modal fade" id="editQuestionAnswer">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Edit Question</h5>
                                    <button class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-body">
                                <form>
                                    <div class="form-group d-flex flex-column">
                                        <label for="description" class="text-left">Title</label>
                                        <textarea class="form-control" id="message" rows="3" v-model="editQuestion.title"></textarea>
                                        <label for="description" class="text-left">Content</label>
                                    </div>
                                         <vue-editor id="editor" v-model="editQuestion.description"></vue-editor>
                                </form>
                                </div>
                                <div class="modal-footer ">
                                    <button class="btn btn-danger font-weight-bold" data-dismiss="modal">Cancel</button>
                                    <button class="btn btn-primary font-weight-bold ml-1" data-dismiss="modal" @click="updateQuestion(editQuestion.id)">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-col>

                <!--MyAnswers-->
                <b-col id="five" cols="5">
                    <h4 id="my-a">My Answers</h4><br>
                    <div id="my-q-container" v-for="(answer, index) in myAnswers" :key="index">
                        <b-card bg-variant="dark" text-variant="white" :title="answer.question.title">
                            <b-card-text v-html="answer.description">
                            </b-card-text>
                        <div>
                            <b-button data-toggle="modal" data-target="#editModalAnswer" variant="primary" @click="editAnswers(answer._id, answer.description)">Edit</b-button>
                        </div>
                        </b-card><br>
                    </div>
                   <!-- Edit Answer Modal -->
                    <div class="modal fade" id="editModalAnswer">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Edit Answer</h5>
                                    <button class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-body">
                                <form>
                                    <div class="form-group d-flex flex-column">
                                        <label for="description" class="text-left">Content</label>
                                    </div>
                                        <vue-editor id="editor" v-model="editAnswer.description"></vue-editor>
                                </form>
                                </div>
                                <div class="modal-footer ">
                                    <button class="btn btn-danger font-weight-bold" data-dismiss="modal">Cancel</button>
                                    <button class="btn btn-primary font-weight-bold ml-1" data-dismiss="modal" @click="updateAnswer(editAnswer.id)">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
import { VueEditor } from 'vue2-editor';

export default {
    name: 'profile',
    components: {
        VueEditor
    },
    data() {
        return {
            editQuestion: {
                id: '',
                title: '',
                description: ''
            },
            editAnswer: {
                id: '',
                description: ''
            }
        }
    },
    props: ['myQuestions', 'myAnswers', 'getProfileDatas'],
    created() {
        this.getProfileDatas()
    },
    methods: {
        editQuestions(id, title, description) {
            this.editQuestion.id = id
            this.editQuestion.title = title
            this.editQuestion.description = description
        },
        updateQuestion(id) {
            const token = localStorage.getItem('token')
            axios({
                method: 'put',
                data: {
                    title: this.editQuestion.title,
                    description: this.editQuestion.description
                },
                url: `http://localhost:3000/questions/${id}`,
                headers: {token}
            })
                .then(({data}) => {
                    this.editQuestion.title = data.title
                    this.editQuestion.description = data.description
                    this.getProfileDatas()
                    // console.log('updated question => ', data)
                })
        },
        editAnswers(id, description) {
            this.editAnswer.id = id
            this.editAnswer.description = description
        },
        updateAnswer(id) {
            const token = localStorage.getItem('token')
            axios({
                method: 'patch',
                data: {
                    description: this.editAnswer.description
                },
                url: `http://localhost:3000/answers/${id}`,
                headers: {token}
            })
                .then(({data}) => {
                    this.editAnswer.title = data.title
                    this.editAnswer.description = data.description
                    this.getProfileDatas()
                    // console.log('updated answer => ', data) 
                })
        },
        deleteQuestion(id) {
            const token = localStorage.getItem('token')

            axios({
                method: 'delete',
                url: `http://localhost:3000/questions/${id}`,
                headers: {token}
            })
                .then(({data}) => {
                    Swal.fire(
                        'Question is deleted!',
                        `Success`,
                        'success'
                    )
                    this.getProfileDatas()
                })
                .catch(err => {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: JSON.parse(err.response.request.response).message[0]
                    })
                })
        }
    }

}
</script>

<style>
#seven {
    text-align: left;
}

#five {
    text-align: left;
}

#my-q {
    border-bottom: 1px solid black;
}

#my-a {
    border-bottom: 1px solid black;
}

#edit {
    margin-right: 10px;
}

#editor {
    margin-bottom: 40px;
    padding-bottom: 40px;
}

</style>
import Vue from "vue";
import Vuex from "vuex";
// import router from "../router";
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLogin: false,
        questions: []
    }, 
    mutations: {
        CHANGEISLOGIN (state, payload) {
            state.isLogin = payload;
        },
        SETQUESTIONS (state, payload) {
            state.questions = payload;
        }
    },
    actions: {
        changeIsLogin (context, payload) {
            context.commit('CHANGEISLOGIN', payload);
        },
        getQuestions ({ commit }) {
            axios({
                method: 'get',
                url: `http://localhost:3000/questions/top`,
            })
                .then(({data}) => {
                    commit('SETQUESTIONS', data.reverse());
                })
                .catch((err) => {
                    console.log('Get All Questions Error: ', err);
                });
        }
        // getSearch ({ commit }, payload) {
        //     axios({
        //         method: 'get',
        //         url: `http://localhost:3000/questions/search/${payload}`
        //     })
        //         .then(({ data }) => {
        //             commit('SETQUESTIONS', data.reverse());
        //         })
        //         .catch(err => {
        //         console.log(err)
        //         })
        // }
    }
})


const routes = [
  {
    path: '',
    component: Course,
    name:'ViewCourse'
  },
  {
    path: '/module/:course_id/:module_id',
    component: Module,
    name: 'ViewModule'
  },
  {
    path: '/:course_id/:quiz_id',
    component: Quiz,
    name: 'QuizModule'
  }
]

const router = new VueRouter({routes})

// Vuex Store
const store = new Vuex.Store({
  state: {
    courseData: data[0],
    questions: [],
    response: [],
    TOKEN: JSON.parse(localStorage.getItem('TOKEN')) || undefined,
    result: [],
    answer: [],
    question: undefined,
    module: undefined,
    file: '',
    lesson: undefined,
    quiz: undefined
  },
  mutations: {
    UPDATE_COURSE (state, payload) {
      state.courseData = payload
    },
    UPDATE_TOKEN (state, payload) {
      state.TOKEN = payload
    },
    UPDATE_SELECTED_QUESTION(state, payload) {
      state.questions = payload.data;
      state.response = payload;
    },
    UPDATE_QUESTION (state, payload) {
      state.question = payload
    },
    UPDATE_CHECKED_ANSWERS (state, payload) {
      state.answer.push(payload)
    },
    REMOVE_CHECKED_ANSWERS (state, payload) {
      state.answer = state.answer.filter(ans => {
          return ans != payload.id
      })
    },
    UPDATE_FILE (state, payload) {
      state.file = payload
    },
    UPDATE_RESPONSE_RESULT (state, payload) {
      state.result = payload
    },
    SET_ANSWER(state, payload) {
      state.answer = payload
    },
    UPDATE_MODULE(state, payload) {
      state.module = payload
    },
    UPDATE_LESSON(state, payload) {
      state.lesson = payload
    },
    UPDATE_QUIZ(state, payload) {
      state.quiz = payload
    }
  },
  actions: {
    getCourse ({commit}) {
      commit('UPDATE_COURSE', courseData)
    },

    login (state, payload) {
      const username = payload["username"]
      const password = payload["password"]
      axios({
        method: 'POST',
        url: 'http://localhost:8000/api/login/',
        data: {
          username: username,
          password: password
        }
      })
      .then((response) => {
        token = response.data.token
        if (token) {
          localStorage.setItem('TOKEN', JSON.stringify(token))
          state.commit('UPDATE_TOKEN', token)
        }
      }).catch((error) => {
        console.log(error)
      })
    },

    showQuestion({commit}, question) {
      this.state.result = []
      this.state.answer = []
      commit('UPDATE_QUESTION', question)
      localStorage.setItem('question', JSON.stringify(question))
    },

    showModule({commit}, module) {
      console.log(module)
      this.state.module = undefined
      this.state.lesson = undefined
      this.state.quiz = undefined
      commit('UPDATE_MODULE', module)
    },
    
    showLesson({commit}, lesson) {
      console.log(lesson)
      this.state.lesson = undefined
      this.state.module = undefined
      this.state.quiz = undefined
      commit('UPDATE_LESSON', lesson)
    },

    showQuiz({commit}, quiz) {
      console.log(quiz)
      this.state.lesson = undefined
      this.state.module = undefined
      commit('UPDATE_QUIZ', quiz)
    },

    updateCheckedAnswers ({commit}, choices) {
      if(choices.checked) {
        commit('UPDATE_CHECKED_ANSWERS', choices.id)
      } else {
        commit('REMOVE_CHECKED_ANSWERS', choices)
      }
    },

    async submitAnswer (state) {
      const answerPaperId = state.state.questions.id
      const questionId = state.state.question.id
      const answer = state.state.answer
      axios({
        method: 'POST',
        url:`http://localhost:8000/api/validate/${answerPaperId}/${questionId}/`,
        headers: {
          Authorization: 'Token ' + state.state.TOKEN
        },
        data: {
          answer: answer
        },
        timeout: 2500
      })
      .then((response) => {
        if(this.state.question.type === 'code') {
          if(response.data.status === 'running') {
            axios({
              method: 'GET',
              url: `http://localhost:8000/api/validate/${response.data.uid}/`,
              headers: {
                Authorization: 'Token ' + state.state.TOKEN
              } 
            })
            .then((response) => {
              const result = JSON.parse(response.data.result)
              state.commit('UPDATE_RESPONSE_RESULT', result)
            })
          }
        }
      })
    }
  },

  getters: {
    course_data: state => state.courseData,
    getQuestions: state => state.questions,
    gettoken: state => state.TOKEN,
    question: state => state.question,
    answer: state => state.answer,
    result: state => state.result,
    module: state => state.module,
    lesson: state => state.lesson,
    quiz: state => state.quiz
  }
})


new Vue({
  name: 'App',
  el: '#app',
  router,
  store,
  template : `
  <div>
    <nav class="navbar bg-dark navbar-dark">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="index.html">
            <img src="@/../static/images/yaksh_banner.png" alt="YAKSH"/>
          </a>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
  `,
})
